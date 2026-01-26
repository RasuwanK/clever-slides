import { type ComponentProps, forwardRef } from "react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils/tailwind";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react";

interface TextAreaWithButtonProps {
  className?: string;
  placeholder?: string;
  onClick?: ComponentProps<"button">["onClick"];
  defaultValue?: ComponentProps<"textarea">["defaultValue"];
}

export const TextAreaWithButton = forwardRef<
  HTMLTextAreaElement,
  TextAreaWithButtonProps
>(function _TextAreaWithButton(
  { placeholder, className, defaultValue, onClick }: TextAreaWithButtonProps,
  ref
) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 border-primary min-w-2xl placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <Textarea
        ref={ref}
        rows={5}
        cols={1}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="min-h-0 shadow-none border-0 focus-visible:border-none resize-none focus-visible:ring-0"
      />
      <div id="toolbar" className="flex flex-row items-center w-full">
        <Button className="ml-auto text-sm" onClick={onClick}>
          <PaperPlaneTiltIcon size={32} /> Generate
        </Button>
      </div>
    </div>
  );
});
