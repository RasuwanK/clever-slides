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
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Skeleton } from "../../../components/ui/skeleton";
interface AIChatProps {
  isGenerating: boolean;
  prompt?: string | null;
  response?: GeneratedContent;
}

export function AIChat({ prompt, response, isGenerating }: AIChatProps) {
  console.log(isGenerating);
  return (
    <Card
      id="ai-chat"
      className="hidden sm:flex flex-col border-primary w-full h-[80vh] px-2 text-xs"
    >
      <CardHeader className="px-1">
        <CardTitle>
          <h1 className="flex flex-row gap-2 items-center">
            <RobotIcon size={20} /> <span>Vibe Presentation Assistant</span>
          </h1>
        </CardTitle>
      </CardHeader>
      {prompt ? (
        <CardContent className="flex flex-col gap-4 px-1 h-full overflow-y-scroll">
          {prompt && (
            <CardDescription className="text-xs py-2">
              <span className="font-bold">Prompt: </span>
              {prompt}
            </CardDescription>
          )}
          <p className="text-gray-400">
            {isGenerating ? "Generating slides" : "Generated slides"}
          </p>
          <div id="generated-slides" className="flex flex-col gap-4">
            {isGenerating === true
              ? [1, 2, 3, 4, 5].map((fakeSlide, slideIndex) => (
                  <Card key={slideIndex}>
                    <CardHeader>
                      <CardTitle>
                        <Skeleton className="h-4 w-full" />
                      </CardTitle>
                      <CardDescription>
                        <Skeleton className="h-2 w-[80%]" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc">
                        {[1, 2, 3, 4, 5, 6].map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>
                            <Skeleton className="h-2 w-[80%]" />
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-6 w-full" />
                    </CardFooter>
                  </Card>
                ))
              : response?.slides.map((slide, slideIndex) => (
                  <Card key={slideIndex} className="text-xs">
                    <CardHeader>
                      <CardTitle>{slide.title}</CardTitle>
                      <CardDescription className="text-xs">
                        Content generated for slide {slideIndex + 1}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-xs">
                      {!slide.content || slide.content.length === 0 ? (
                        <p>Used as a cover slide. No content generated</p>
                      ) : (
                        <ul className="list-disc">
                          {slide.content
                            .map(({ bullets }) => [...bullets])
                            .reduce((prev, curr) => curr.concat(...prev))
                            .map((bullet, bulletIndex) => (
                              <li key={bulletIndex}>{bullet}</li>
                            ))}
                        </ul>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full text-xs">
                        Go to Slide {slideIndex + 1}{" "}
                        <ArrowRightIcon size="20" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </CardContent>
      ) : (
        <CardContent className="flex flex-col justify-center gap-4 px-1 h-full overflow-y-scroll py-3">
          <Item>
            <ItemContent className="text-center">
              <ItemTitle>
                Hello there ! How shall I reshape your presentation.
              </ItemTitle>
              <ItemDescription>
                I&apos;ll Guide you to create the best presentation out of the
                box.
              </ItemDescription>
            </ItemContent>
          </Item>
        </CardContent>
      )}
      <CardFooter className="px-0">
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
