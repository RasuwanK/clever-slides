"use client";

import { HouseIcon } from "lucide-react";
import Link from "next/link";

export function HomeLink() {
  return (
    <Link
      href="/"
      className="mt-6 inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
    >
      <HouseIcon /> <span className="ml-2">Return Home</span>
    </Link>
  );
}
