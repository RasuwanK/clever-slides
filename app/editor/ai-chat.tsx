import { RobotIcon } from "@phosphor-icons/react";
import type { GeneratedContent } from "@/lib/types/utils";
import { Card } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

interface AIChatProps {
  isGenerating: boolean;
  prompt: string | null;
  response?: GeneratedContent;
}

export function AIChat({ prompt, response, isGenerating }: AIChatProps) {
  return (
    <Card
      id="ai-chat"
      className="flex flex-col gap-2 border-primary w-full h-[80vh] overflow-y-scroll right-0 top-0 py-4 px-2 text-sm"
    >
      <h1 className="flex flex-row gap-2">
        <RobotIcon size={20} /> <span>Your Assistant</span>
      </h1>
      <Item
        id="prompt"
        className="my-5"
        variant="outline"
        size="sm"
      >
        <ItemContent>
          <ItemTitle className="font-bold">Prompt</ItemTitle>
          <ItemDescription>{prompt}</ItemDescription>
        </ItemContent>
      </Item>
      {isGenerating ? "Loading" : ""}
      <p className="text-gray-400">Generated slides</p>
      <div id="generated-slides" className="flex flex-col gap-4">
        {response?.slides.map((slide, index) => (
          <Item key={index} variant="outline">
            <ItemContent>
              <ItemTitle>{slide.title}</ItemTitle>
              <ItemDescription>
                {slide.bullets.map((bullet, index) => (
                  <ul className="list-decimal" key={index}>
                    <li>{bullet}</li>
                  </ul>
                ))}
              </ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </div>
    </Card>
  );
}
