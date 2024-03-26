import { z } from 'zod';
export const selectSchema = (forceRequired = false) => (
  forceRequired
    ? z.object({ value: z.string(), label: z.string() })
    : z.object({ value: z.string().optional(), label: z.string().optional() }).optional()
);
