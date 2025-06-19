import * as authSchema from "@/lib/schema/auth.schema";
import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle("file:soundstash.db", { schema: authSchema });
