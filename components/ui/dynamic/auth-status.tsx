"use client";

import dynamic from "next/dynamic";

// This component has been made dynamic to solve a Radix UI id issue on SSR
export const AuthStatus = dynamic(() => import("../auth-status"), {
    ssr: false,
});