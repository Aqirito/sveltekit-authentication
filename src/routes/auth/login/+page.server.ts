import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import jwt_decode from 'jwt-decode';
const apiUrl = import.meta.env.VITE_API_URL;


export const load: PageServerLoad = async ({locals}) => {
  if(locals.role === "ADMIN") {
    throw redirect(303, '/admin');
  }
  return {
    data: locals,
  }
}

export const actions = {
  default: async ({ request, fetch, cookies }) => {
    // TODO log the user in
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
    const res = await fetch('/auth/login-v2', {
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

    cookies.set('access_token', results.access_token, { 
      maxAge: decodedToken.exp,
      secure: true,
      sameSite: "strict"
    })
    return {
      success: true,
    }
  }
} satisfies Actions;