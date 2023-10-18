import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, locals }) => {
  cookies.delete('access_token', {
    path: '/'
  });
  locals.isAuth = false
  
  return {
    locals
  };
}) satisfies PageServerLoad;