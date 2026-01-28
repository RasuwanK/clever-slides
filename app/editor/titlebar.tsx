"use client";
import { Button } from "@/components/ui/button";
import { DownloadSimpleIcon, PresentationIcon } from "@phosphor-icons/react";

export function Titlebar() {
  return (
    <nav id="navbar" className="w-full flex flex-row gap-2 items-center">
      <div id="file-info" className="flex flex-col">
        <h1 className="text-xl font-bold">
          {/* {presentation?.content.title} */}
        </h1>
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
      </div>
    </nav>
  );
}
