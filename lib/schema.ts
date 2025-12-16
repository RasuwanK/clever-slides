import {z} from "zod"

const SlideSchema = z.object({
    layout: z.string(),
    title: z.string(),
    bullets: z.array(z.string())
});

const PresentationSchema = z.object({
    theme: z.object({
        accentColor: z.string(),
        background: z.enum(["light", "dark"])
    }),
    slides: z.array(SlideSchema)
});

export {
    PresentationSchema,
    SlideSchema
}