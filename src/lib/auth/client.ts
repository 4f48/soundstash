import { createAuthClient } from "better-auth/react";
import { createAuthClient as createSvelteAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient();
export const newAuthClient = createSvelteAuthClient();
