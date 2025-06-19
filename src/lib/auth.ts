import * as authSchema from "@/lib/schema/auth.schema";
import { d1 } from "@/pages/index.astro";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";

const db = drizzle(d1, { schema: authSchema });
