"use client";
import { Button } from "@/components/ui/button";
import { AuthStatus } from "@/components/ui/dynamic/auth-status";
import { DownloadSimpleIcon, PresentationIcon } from "@phosphor-icons/react";
import { User } from "@/components/ui/auth-status";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";

interface TitlebarProps {
  user?: User;
  title: string;
}

export function Titlebar({ user, title }: TitlebarProps) {
  return (
    <nav id="navbar" className="w-full flex flex-row gap-2 items-center">
      <Link href="/">
        <ArrowLeftIcon size={20} className="text-primary mr-4" weight="bold" />
      </Link>
      <div id="file-info" className="flex flex-col">
        <h1 className="text-xl">{title}</h1>
        <p className="text-sm">Last updated 2025/02/02</p>
        {/* <h2 className="text-sm">{presentation?.updated_at ?? ""}</h2> */}
      </div>
      <div
        id="right-aligned"
        className="flex flex-row ml-auto gap-4 items-center"
      >
        <div id="controls" className="flex flex-row gap-2">
          <Button variant="outline" className="min-w-40">
            <DownloadSimpleIcon size={32} />
            Export
          </Button>
          <Button className="min-w-40">
            <PresentationIcon size={32} />
            Present
          </Button>
        </div>
        <div id="auth-status">
          <AuthStatus user={user} />
        </div>
      </div>
    </nav>
  );
}
