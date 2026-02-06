import {
  ArrowRightIcon,
  PaperPlaneRightIcon,
  RobotIcon,
} from "@phosphor-icons/react";
import type { GeneratedContent } from "@/lib/types/utils";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

interface AIChatProps {
  isGenerating: boolean;
  prompt: string | null;
  response?: GeneratedContent;
}

export function AIChat({ prompt, response, isGenerating }: AIChatProps) {
  return (
    <Card
      id="ai-chat"
      className="relative flex flex-col gap-2 border-primary w-full h-[80vh] right-0 top-0 py-4 px-2 text-sm"
    >
      <CardHeader>
        <CardTitle>
          <h1 className="flex flex-row gap-2">
            <RobotIcon size={20} /> <span>Your Assistant</span>
          </h1>
        </CardTitle>
        <CardDescription className="text-xs py-2">
          <span className="font-bold">Prompt: </span>
          {prompt}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-1 overflow-y-scroll py-3">
        {isGenerating ? "Loading" : ""}
        <p className="text-gray-400">Generated slides</p>
        <div id="generated-slides" className="flex flex-col gap-4">
          {response?.slides.map((slide, slideIndex) => (
            <Card key={slideIndex}>
              <CardHeader>
                <CardTitle>{slide.title}</CardTitle>
                <CardDescription>
                  Content generated for slide {slideIndex + 1}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs">
                {slide.bullets.length === 0 ? (
                  <p>Used as a cover slide. No content generated</p>
                ) : (
                  <ul className="list-disc">
                    {slide.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full text-xs">
                  Go to Slide {slideIndex + 1} <ArrowRightIcon size="20" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-1">
        <div id="message-box" className="flex w-full flex-col mt-4">
          <InputGroup className="w-full text-xs">
            <InputGroupTextarea
              className="text-xs"
              placeholder="Enter the your prompt to modify and adjust the content"
            />
            <InputGroupAddon align="block-start"></InputGroupAddon>
            <InputGroupAddon align="block-end">
              <InputGroupText className="text-xs">500/2</InputGroupText>
              <InputGroupButton
                variant="default"
                className="rounded-full ml-auto"
              >
                <PaperPlaneRightIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </CardFooter>
    </Card>
  );
}
