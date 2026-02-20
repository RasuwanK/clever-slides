"use client";

import {
  ArrowRightIcon,
  PaperclipIcon,
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
import { useChatFormStore } from "@/stores/chat-store";
import { useGeneratePresentation } from "@/hooks/use-generate-presentation";
import { useChatQuery } from "@/hooks/chat/use-chat-query";
import { useChatMutation } from "@/hooks/chat/use-chat-mutation";

interface AIChatProps {
  presentationId: string;
  userId: string;
}

export function AIChat({ userId, presentationId }: AIChatProps) {
  // State of the database saved chat
  const chatQuery = useChatQuery({ presentationId });

  // Functions to modify a given chat
  const chatMutation = useChatMutation();

  const chatFormState = useChatFormStore((state) => state.formState);
  const setField = useChatFormStore((state) => state.setField);

  // Mutation to generate presentation
  const generateMutation = useGeneratePresentation();

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
      <CardContent className="flex flex-col gap-4 px-1 h-full overflow-y-scroll">
        {chatQuery.data?.main_prompt && (
          <CardDescription className="text-xs py-2">
            <span className="font-bold">Prompt: </span>
            {chatQuery.data?.main_prompt}
          </CardDescription>
        )}
        <p className="text-gray-400">
          {chatQuery.isLoading ? "Generating slides" : "Generated slides"}
        </p>
        <div id="generated-slides" className="flex flex-col gap-4">
          {chatQuery.isLoading === true ? (
            [1, 2, 3, 4, 5].map((fakeSlide, slideIndex) => (
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
          ) : (!chatQuery.data || !chatQuery.data.messages)  ? (
            <p>No chat</p>
          ) : (
            chatQuery.data.messages.map(({message, sent_by}, messageIndex) => {
              const {slides} = message as GeneratedContent;
              return <Card key={messageIndex} className="text-xs">
                <CardHeader>
                  <CardTitle>Message Title</CardTitle>
                  <CardDescription className="text-xs">
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs">
                  
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => {
                      setField("currentSlide",'da');
                    }}
                    className="w-full text-xs"
                  >
                    <PaperclipIcon />
                  </Button>
                </CardFooter>
              </Card>
            }
            ))
          }
        </div>
      </CardContent>
      <CardFooter className="px-0">
        <div id="message-box" className="flex w-full flex-col mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <InputGroup className="w-full text-xs">
              <InputGroupTextarea
                onChange={(e) => {
                  setField("prompt", e.target.value);
                }}
                className="text-xs"
                placeholder="Enter the your prompt to modify and adjust the content"
              />
              <InputGroupAddon align="block-start"></InputGroupAddon>
              <InputGroupAddon align="block-end">
                <InputGroupText className="text-xs">500/2</InputGroupText>
                <InputGroupButton
                  type="submit"
                  variant="default"
                  className="rounded-full ml-auto"
                >
                  <PaperPlaneRightIcon />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </div>
      </CardFooter>
    </Card>
  );
}
