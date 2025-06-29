import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "drizzle/schema";

export const db = drizzle(import.meta.env.DATABASE_URL, { schema });
