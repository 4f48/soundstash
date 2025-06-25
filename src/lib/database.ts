import * as schema from "@/lib/schema";
import { drizzle } from "drizzle-orm/neon-serverless";

export const db = drizzle(import.meta.env.DATABASE_URL, { schema });
