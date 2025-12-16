import type { ComponentProps } from "react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils";

interface TextAreaWithButtonProps {
  className?: string;
  placeholder?: string;
}

export function TextAreaWithButton({
  placeholder,
  className,
}: TextAreaWithButtonProps) {
  return (
    <div
      className={cn(
        "flex flex-row items-center border-primary min-w-2xl placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <Textarea
        rows={1}
        cols={1}
        placeholder={placeholder}
        className="min-h-0 shadow-none border-0 focus-visible:border-none resize-none focus-visible:ring-0"
      />
      <Button>Generate</Button>
    </div>
  );
}
