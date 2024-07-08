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


    const getFullPathname = () => {
        const params = new URLSearchParams(searchParams.toString())
        return pathname + `?${params.toString()}`
    }

    const replaceRouter =
        useCallback((value: string) =>
            router.replace(pathname + `?${value}`, { scroll: false }), [pathname, router])


    const getQueryParam = useCallback((name: string): string | null => {
        return searchParams.get(name) as string | null;
    }, [searchParams])

    const setQueryParam = useCallback(({ name, value }: {
        name: string;
        value: string;
    }) => {
        replaceRouter(createQueryString(name, value));
    }, [createQueryString, replaceRouter])

    const deleteQueryParam = (name: string) => {
        replaceRouter(deleteQueryString(name));
    };

    const setQueryParams = ({
        params,
    }: {
        params: { name: string; value: string }[];
    }) => {
        const newParams = new URLSearchParams(searchParams.toString());
        params.forEach(({ name, value }) => {
            newParams.set(name, value);
        });
        replaceRouter(newParams.toString());
    }

    const deleteQueryParams = (names: string[]) => {
        const newParams = new URLSearchParams(searchParams.toString());
        names.forEach((name) => {
            newParams.delete(name);
        });
        replaceRouter(newParams.toString());
    }


    return {
        getQueryParam,
        setQueryParam,
        deleteQueryParam,
        setQueryParams,
        deleteQueryParams,
        getFullPathname,
        deleteQueryString,
        createQueryString,
    };
}
