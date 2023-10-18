
// its a handle for hooks
// https://kit.svelte.dev/docs/hooks
// we will use "locals" more frequently for authentication
import { redirect, type Handle } from "@sveltejs/kit";
import jwt_decode from 'jwt-decode';
// as request hits server & before response is generated
export const handle: Handle = async ({ event, resolve }) => {

  event.locals.isAuth = false

  const accessToken: any = event.cookies.get('access_token');
  // console.log('access token', accessToken);
  if (accessToken) {
    const decodedToken: any = jwt_decode(accessToken);
    // console.log('decodedToken', decodedToken);
    if (decodedToken.phone_no && decodedToken.userid) {
      event.locals.isAuth = true
      event.locals.role = decodedToken?.user_role
    }
    // convert datetime to seconds
    const currentDateTime = new Date();
    const currentSeconds = Math.floor(currentDateTime.getTime() / 1000);

    // check if session from decoded token expires
    if (currentSeconds >= decodedToken.exp) {
      console.log('session expired!!');
      event.cookies.delete('access_token', {path: '/'});
      event.locals.isAuth = false
    }
  }

  // console.log('locvals', event.locals);
  // console.log('url', event.url.pathname);
  if (event.url.pathname.startsWith('/public')) {
    if (!event.locals.isAuth) {
      throw redirect(303, '/');
    }
  }
  if (event.url.pathname.startsWith('/admin')) {
    if (!event.locals.isAuth) {
      throw redirect(303, '/');
    }
    if (event.locals.role !== 'ADMIN') {
      throw redirect(303, '/')
    }
  }

  // render route & generate response await resolve(event)
  const response = await resolve(event);

  // take action after response generated
  return response;
}