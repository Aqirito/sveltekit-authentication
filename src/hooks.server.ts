
// its a handle for hooks
// https://kit.svelte.dev/docs/hooks
// we will use "locals" more frequently for authentication
import type { Handle } from "@sveltejs/kit";

// as request hits server & before response is generated
export const handle: Handle = async ({ event, resolve }) => {
  
  // render route & generate response await resolve(event)
  const response = await resolve(event);

  // take action after response generated
  return response;
}