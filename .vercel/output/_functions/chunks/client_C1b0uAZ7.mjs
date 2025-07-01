import { createAuthClient } from 'better-auth/react';

const authClient = createAuthClient({
  baseURL: "https://soundstash.pirger.eu" 
});

export { authClient as a };
