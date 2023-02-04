import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
 
export const actions = {
  default: async ({ request }) => {
    // TODO log the user in
    // console.log('login request', request);
    const formData = await request.formData();
    console.log('login formData', formData)

    // seperate the data for validations
    const username = formData.get('username');
    const password = formData.get('password');

    // TODO you can create validations here
    if (!username) {
      return fail(400, {
        success: false,
        message: "Username is Required!.",
        // the data is dissapear after form actions is accur
        // return the from value to get back the value submitted
        // so user will not rewrite the forms from zero 
        value: {
          username,
          password
        }
      })
    }
    if (username.length < 2) {
      return fail(400, {
        success: false,
        message: "username must be atleast two characters"
      })
    }

    throw redirect(303, '/');
    // return {
    //   success: true
    // }
  }
} satisfies Actions;