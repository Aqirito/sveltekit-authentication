import type { RequestHandler } from './$types';

const apiUrl = import.meta.env.VITE_API_URL;

export const GET: RequestHandler = async () => {
    return new Response();
};

export const POST: RequestHandler = async ({ fetch, request }) => {

  // console.log('data', await request.json());

  const res = await fetch(`${apiUrl}/auth/public/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(await request.json())
  });
  const result = await res.json();

  return new Response(JSON.stringify(result))
}