import { db, github, lucia } from "@/lib/db";
import { account, user } from "@/lib/db/schema";
import { generateState, OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";

const app = new Hono()
  .get("login/github", async (c) => {
    const state = generateState();
    const url = await github.createAuthorizationURL(state);

    cookies().set("github_oauth_state", state, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    });
    return Response.redirect(url);
  })
  .get("login/github/callback", async (c) => {
    const url = new URL(c.req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("github_oauth_state")?.value ?? null;
    if (!code || !state || !storedState || state !== storedState) {
      throw new HTTPException(401);
    }

    try {
      const tokens = await github.validateAuthorizationCode(code);
      const githubUserResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });

      const githubUser: GithubUser = await githubUserResponse.json();

      const existingUser = await db
        .select()
        .from(user)
        .where(eq(
          user.github_id,
          githubUser.id,
        ))
        .limit(1);

      if (existingUser && existingUser.length > 0) {
        const session = await lucia.createSession(existingUser[0].id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );

        const accounts = await db.select().from(account).where(
          eq(account.userId, existingUser[0].id),
        );

        if (!accounts || accounts.length === 0) {
          const [defaultAccount] = await db.insert(account).values({
            name: existingUser[0].username,
            userId: existingUser[0].id,
          }).returning({
            id: account.id,
            name: account.name,
            userId: account.userId,
          });

          await db.update(user).set({
            defaultAccountId: defaultAccount.id.toString(),
          }).where(eq(user.id, defaultAccount.userId));
        }

        return new Response(null, {
          status: 302,
          headers: {
            Location: "/",
          },
        });
      }

      const userId = generateIdFromEntropySize(10);

      await db
        .insert(user)
        .values({
          id: userId,
          username: githubUser.login,
          github_id: githubUser.id,
        });

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    } catch (error) {
      if (error instanceof OAuth2RequestError) {
        throw new HTTPException(400, {
          message: error.message,
        });
      }
      throw new HTTPException(500);
    }
  });

type GithubUser = {
  id: string;
  login: string;
};

export default app;
