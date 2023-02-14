import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import jwt_decode from 'jwt-decode';
const apiUrl = import.meta.env.VITE_API_URL;


export const load: PageServerLoad = async ({locals, parent}) => {
  parent()
  return {
    data: locals,
  }
}

export const actions = {
  default: async ({ request, fetch, cookies }) => {

    // console.log('login request', request);
    const formData = await request.formData();
    // console.log('login formData', formData)

    // seperate the data for validations
    const phone_no = formData.get('phone_no');
    const password = formData.get('password');

    const payload = {
      phone_no,
      password
    }
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    const results = await res.json();
    const accessToken = results.access_token;
    const decodedToken: any = jwt_decode(accessToken);
    console.log('decodedToken', decodedToken);

    // for expire time was set it both to make sure most of the browser works
    cookies.set('access_token', results.access_token, {
      path: '/', // path msut be set to root for make all routes authentication works
      maxAge: parseInt(decodedToken.exp),
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      priority: 'high', // for authentications
      expires: new Date(decodedToken.exp),
    })
    return {
      success: true,
    }
  }
} satisfies Actions;