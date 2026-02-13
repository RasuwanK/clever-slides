"use client";

import { Button } from "./button";
import { cn } from "@/lib/utils/tailwind";
import { GearSixIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { Input } from "./input";
import { PromptSchema } from "@/lib/schema";
import { usePromptFormStore } from "@/stores/prompt-store";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupTextarea } from "./input-group";
import { usePresentation } from "@/hooks/use-presentation";
import { useDocument } from "@/hooks/use-document";
import { useChat } from "@/hooks/use-chat";

interface GenerateInputProps {
  userId?: string;
}

export function MainPromptInput({ userId }: GenerateInputProps) {
  const router = useRouter();

  const formState = usePromptFormStore((state) => state.formState);
  const setField = usePromptFormStore((state) => state.setField);
  const errors = usePromptFormStore((state) => state.errors);
  const setError = usePromptFormStore((state) => state.setError);

  // Provided an empty presentation
  const presentation = usePresentation({});

  // Provided an empty document
  const document = useDocument({});

  // Provided an empty chat
  const chat = useChat({});

  return (
    <form
      className={cn("flex-col gap-5")}
      onSubmit={async (e) => {
        e.preventDefault();

        const parsed = PromptSchema.safeParse({
          prompt: formState.prompt,
          width: formState.width,
          height: formState.height,
        });

        if (!parsed.success) {
          return;
        }

        // No generation for un authenticated users
        const presentationId = crypto.randomUUID();
        const documentId = crypto.randomUUID();
        const chatId = crypto.randomUUID();

        if (!userId) {
          // Save the prompt and redirect to sign in page
          router.push("/auth/signin");
          return;
        }

        // Create a presentation
        await presentation.upsert({
          id: presentationId,
          created_by: userId,
        });

        // Create a document
        await document.upsert({
          id: documentId,
          belongs_to: presentationId,
          version: 0.1,
        });

        // Create a chat
        await chat.upsert({
          id: chatId,
          main_prompt: parsed.data.prompt,
          belongs_to: presentationId,
        });

        // Redirect to regenerate
        router.push("/editor/" + presentationId);
      }}
    >
      <InputGroup>
        <InputGroupTextarea
          rows={5}
          cols={1}
          placeholder="Create a professional presentation for a pitch deck about an AI startup"
          className="min-h-0 py-4 text-sm sm:text-md shadow-none border-0 focus-visible:border-none resize-none focus-visible:ring-0"
          onChange={(e) => {
            setField("prompt", e.target.value);

            if (e.target.value === "") {
              setError("prompt", "Please provide a prompt");
            } else {
              setError("prompt", null);
            }
          }}
        />
        <InputGroupAddon align="block-end">
          <div id="toolbar" className="flex flex-row items-center w-full">
            <div
              id="resolution-tool"
              className="hidden sm:flex flex-row items-center w-full gap-2 text-xs"
            >
              <p>Resolution (px)</p>
              <Field className="w-[50%]">
                <Input
                  type="text"
                  name="width"
                  placeholder="Width"
                  defaultValue={formState.width.toString()}
                  onChange={(e) => {
                    const width = Number(e.target.value);
                    setField("width", width);

                    if (Number.isNaN(width)) {
                      setError("width", "Invalid dimensions");
                    } else if (width >= 4000) {
                      setError("width", "Dimention is beyond 4000 pixels");
                    } else {
                      setError("width", null);
                    }
                  }}
                  className="lg:text-xs"
                />
              </Field>
              <Field className="w-[50%]">
                <Input
                  type="text"
                  name="width"
                  placeholder="Height"
                  defaultValue={formState.height.toString()}
                  onChange={(e) => {
                    const height = Number(e.target.value);
                    setField("height", height);

                    if (Number.isNaN(height)) {
                      setError("height", "Invalid dimensions");
                    } else if (height >= 4000) {
                      setError("height", "Dimention is beyond 4000 pixels");
                    } else {
                      setError("height", null);
                    }
                  }}
                  className="lg:text-xs"
                />
              </Field>
            </div>
            <Button
              type="button"
              variant="outline"
              id="settings-button"
              className="flex"
            >
              <GearSixIcon />
            </Button>
            <Button
              type="submit"
              disabled={
                !formState.height || !formState.width || !formState.prompt
                  ? true
                  : false
              }
              className="ml-auto text-sm"
            >
              <PaperPlaneTiltIcon size={32} /> Generate
            </Button>
          </div>
        </InputGroupAddon>
      </InputGroup>
      {(errors?.height || errors?.width) && (
        <div
          id="errors"
          className="flex flex-row justify-center text-xs bg-primary rounded-sm p-1"
        >
          <p className="text-black font-bold">
            {errors.height || errors.width
              ? "dimensions must be less than 4000x4000"
              : null}
          </p>
        </div>
      )}
    </form>
  );
}
