"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecentPresentations } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Recents({ userId }: { userId: string }) {
  const supabase = createClient();

  const { data, isLoading } = useQuery({
    queryKey: ["recents", userId],
    queryFn: () => getRecentPresentations(supabase, { userId }),
  });

  if (isLoading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div id="recents" className="flex flex-col gap-4 items-center mt-10">
      <h2>Recents</h2>
      <ul className="list-none grid grid-cols-3 gap-2 w-full">
        {/* Add a loading state */}
        {data &&
          data.map(({ id, created_at, content, prompt }, key) => (
            <li key={key}>
              <Link href={`editor/${id}`}>
                <Card className="w-50 p-0">
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      <div id="preview" className="w-full h-25 bg-gray-400 rounded-t-sm">
                      </div>
                      <p className="text-sm py-4 px-2">{prompt?.slice(0, 10) ?? id}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
