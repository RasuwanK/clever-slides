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
import { useEffect, useRef } from "react";
import { MessageSchema } from "@/lib/schema";
import { useMessageMutation } from "@/hooks/messages/use-messages-mutation";

interface AIChatProps {
  presentationId: string;
  userId: string;
}

export function AIChat({ userId, presentationId }: AIChatProps) {
  // message form
  const messageFormRef = useRef<HTMLFormElement>(null);

  // State of the database saved chat
  const chatQuery = useChatQuery({ presentationId });

  // Functions to modify a given chat
  const chatMutation = useChatMutation();

  // Functions to send messages
  const messageMutation = useMessageMutation();

  const chatFormState = useChatFormStore((state) => state.formState);
  const setField = useChatFormStore((state) => state.setField);

  // Mutation to generate presentation
  const generateMutation = useGeneratePresentation();

  useEffect(() => {
    if (!chatQuery.isLoading && chatQuery.data?.messages.length === 0) {
      if (!messageFormRef.current) {
        return;
      }

      const messageForm = messageFormRef.current;

      // Automatically submit the form intially if no messages are present in the chat, to generate the initial content
      setField("prompt", chatQuery.data.main_prompt);
      messageForm.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }
  }, [chatQuery.data?.messages.length, chatQuery.isLoading]);

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
        {chatQuery.isLoading ? (
          <p>Loading</p>
        ) : !chatQuery.data ? (
          <p> Not chat found </p>
        ) : (
          chatQuery.data.messages.map((message, index) => (
            <p key={index}>{JSON.stringify(message)}</p>
          ))
        )}
      </CardContent>
      <CardFooter className="px-0">
        <div id="message-box" className="flex w-full flex-col mt-4">
          <form
            ref={messageFormRef}
            onSubmit={async (e) => {
              e.preventDefault();

              if(!chatQuery.data || !chatQuery.data.id) {
                throw new Error("No chat has created for this presentation");
              }

              const parsedMessage = MessageSchema.safeParse({
                prompt: chatFormState.prompt.value,
              });

              if (!parsedMessage.success) {
                console.error("Invalid message prompt", parsedMessage.error);
                return;
              }

              // Save the users message
              await messageMutation.mutateAsync({
                message: {
                  id: crypto.randomUUID(),
                  chat: chatQuery.data.id,
                  role: "user",
                  related_user: userId,
                  content: parsedMessage.data.prompt,
                }
              });

              // Generate the presentation based on the user message
              const generated = await generateMutation.mutateAsync({
                prompt: parsedMessage.data.prompt,
              });

              // Saving the AI response to the database
              await messageMutation.mutateAsync({
                message: {
                  id: crypto.randomUUID(),
                  chat: chatQuery.data.id,
                  role: "assistant",
                  related_user: userId,
                  content: generated,
                }
              });

            }}
          >
            <InputGroup className="w-full text-xs">
              <InputGroupTextarea
                onChange={(e) => {
                  setField("prompt", e.target.value);
                }}
                value={chatFormState.prompt.value}
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
