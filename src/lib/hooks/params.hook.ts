"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useParams() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
        return params.toString();
    }, [searchParams]);

    const deleteQueryString = useCallback((name: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(name);
        return params.toString();
    }, [searchParams]);

    const replaceRouter = useCallback(
        (value: string) =>
            router.replace(pathname + `?${value}`, { scroll: false }),
        [pathname, router],
    );

    const getQueryParam = (name: string): string | null => {
        return searchParams.get(name) as string | null;
    };

    const setQueryParam = ({ name, value }: {
        name: string;
        value: string;
    }) => {
        replaceRouter(createQueryString(name, value));
    };

    const deleteQueryParam = (name: string) => {
        replaceRouter(deleteQueryString(name));
    };

    const setQueryParams = useCallback(({
        params,
    }: {
        params: { name: string; value: string }[];
    }) => {
        const newParams = new URLSearchParams(searchParams.toString());
        params.forEach(({ name, value }) => {
            newParams.set(name, value);
        });
        replaceRouter(newParams.toString());
    }, [searchParams, replaceRouter]);

    const deleteQueryParams = useCallback((names: string[]) => {
        const newParams = new URLSearchParams(searchParams.toString());
        names.forEach((name) => {
            newParams.delete(name);
        });
        replaceRouter(newParams.toString());
    }, [searchParams, replaceRouter]);

    return {
        getQueryParam,
        setQueryParam,
        deleteQueryParam,
        setQueryParams,
        deleteQueryParams,
    };
}
