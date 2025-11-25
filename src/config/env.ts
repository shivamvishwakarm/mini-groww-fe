import { z } from 'zod';

const envSchema = z.object({
    VITE_API_BASE_URL: z.string().url(),
    MODE: z.enum(['development', 'production', 'test']).default('development'),
});

export const parseEnv = () => {
    const parsed = envSchema.parse(import.meta.env);

    return {
        nodeEnv: parsed.MODE,
        apiBaseUrl: parsed.VITE_API_BASE_URL,
    };
};

export const config = parseEnv();
