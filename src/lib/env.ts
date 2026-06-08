import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_DEFAULT_API_ENDPOINT_URL: z.string().min(1).url(),
  },

  runtimeEnv: {
    // server values
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_GENERATIVE_AI_API_KEY:
      process.env.GOOGLE_GENERATIVE_AI_API_KEY,

    // client value
    NEXT_PUBLIC_DEFAULT_API_ENDPOINT_URL:
      process.env.NEXT_PUBLIC_DEFAULT_API_ENDPOINT_URL,
  },
});
