
import {z} from "zod"

export const messageSchema = z.object({
    content: z
    .string()
    .min(6, "Content must atleast in 6 digits")
    .max(300, "Content must be no longer that 300 characters")
})  