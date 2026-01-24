"use client";

import { useRecents } from "@/hooks/use-recents";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function Drafts({ userId }: { userId: string }) {
  const { data, isLoading } = useRecents({
    userId,
  });

  if(isLoading) {
    return (
        <div>Loading...</div>
    )
  }

  if(!data) {
    return (
        null
    )
  }

  return (
    <div id="recents" className="flex flex-col gap-4 items-center mt-10">
      <h2>Recents</h2>
      <ul className="list-none grid grid-cols-3 gap-2 w-full">
        {/* Add a loading state */}
        {data &&
          data.map(
            ({ id, created_at, content, prompt, isOptimistic }, key) => {
              const title = content?.title ?? "Empty presentation";
              return (
                <li key={id}>
                  <Link href={`editor/${id}`}>
                    <Card
                      className={
                        isOptimistic ? "w-50 p-0 opacity-30" : "w-50 p-0"
                      }
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col">
                          <div
                            id="preview"
                            className="w-full h-25 bg-gray-400 rounded-t-sm"
                          ></div>
                          <p className="text-sm py-4 px-2">{title}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </li>
              );
            }
          )}
      </ul>
    </div>
  );
}
