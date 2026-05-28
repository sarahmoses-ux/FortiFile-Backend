import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  PRIVY_APP_ID: z.string().optional(),
  PRIVY_SECRET: z.string().optional(),
  ALCHEMY_API_KEY: z.string().optional(),
  PRIVATE_KEY: z.string().optional(),
  NFT_STORAGE_API_KEY: z.string().optional(),
  CONTRACT_ADDRESS: z.string().optional(),
  PROVIDER_MODE: z.enum(["mock", "external"]).default("mock")
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment configuration", parsedEnv.error.flatten().fieldErrors);
  throw new Error("Environment validation failed");
}

export const env = parsedEnv.data;
