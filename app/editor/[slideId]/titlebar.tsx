"use client";
import { Button } from "@/components/ui/button";
import { AuthStatus } from "@/components/ui/dynamic/auth-status";
import {
  DownloadSimpleIcon,
  List,
  ListIcon,
  PresentationIcon,
} from "@phosphor-icons/react";
import { User } from "@/components/ui/auth-status";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";

interface TitlebarProps {
  user?: User;
  title: string;
}

export function Titlebar({ user, title }: TitlebarProps) {
  return (
    <nav
      id="navbar"
      className="w-full flex flex-row gap-2 row-start-1 row-end-2 sm:row-start-auto sm:row-end-auto items-center"
    >
      <Link href="/">
        <ArrowLeftIcon size={20} className="text-primary mr-4" weight="bold" />
      </Link>
      <div id="file-info" className="flex flex-col justify-center">
        <h1 className="text-md sm:text-xl">{title}</h1>
        <p className="hidden sm:block text-sm">Last updated 2025/02/02</p>
        {/* <h2 className="text-sm">{presentation?.updated_at ?? ""}</h2> */}
      </div>
      <div
        id="right-aligned"
        className="flex flex-row ml-auto gap-4 items-center"
      >
        <div id="controls" className="hidden sm:flex flex-row gap-2">
          <Button variant="outline" className="min-w-40">
            <DownloadSimpleIcon size={32} />
            Export
          </Button>
          <Button className="min-w-40">
            <PresentationIcon size={32} />
            Present
          </Button>
        </div>
        <div className="hidden sm:block" id="auth-status">
          <AuthStatus user={user} />
        </div>
        <div className="block sm:hidden">
          <Button variant="outline" className="border-2">
            <ListIcon />
          </Button>
        </div>
      </div>
    </nav>
  );
}
