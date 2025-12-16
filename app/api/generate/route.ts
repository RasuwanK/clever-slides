import { groq } from "@/lib/groq";
import { buildPresentationPrompt } from "@/lib/prompt";

export async function POST(req: Request) {
  const body = await req.json();

  const messages = buildPresentationPrompt({
    topic: body.topic,
    audience: body.audience,
    slides: body.slides,
  });

  const stream = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
    temperature: 0.3,
    stream: true,
  });

  const encoder = new TextEncoder();
  let fullText = "";

  const readableStream = new ReadableStream({
    async start(controller) {
        for await (let chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content;

            if(delta) {
                fullText += delta;
                controller.enqueue(encoder.encode(delta));
            }
        }

        controller.close();
    }
  });


  return new Response(readableStream, {
    headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Full-Completion": encodeURIComponent(fullText),
    }
  });
}
