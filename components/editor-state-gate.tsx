"use client";

import EditorView from "@/app/editor/editor-view";
import { type PresentationRow } from "@/lib/utils";

interface EditorStateGateProps {
    presentation: Pick<PresentationRow, "content" | "created_by" | "prompt">;
    onGenerate: (prompt: string) => void;
}

export function EditorStateGate({presentation, onGenerate}: EditorStateGateProps) {
    // prompt missing => no db save on home page
    if(!presentation.prompt) {
        throw new Error("Prompt missing");
    }

    if(!presentation.content) {
       onGenerate(presentation.prompt);
        return <p>Generating</p>
    }

    return <EditorView schema={presentation.content} />
}