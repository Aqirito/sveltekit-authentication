import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
const apiUrl = import.meta.env.VITE_API_URL;
 
export const actions = {
  default: async ({ request, locals, fetch }) => {
    // TODO log the user in
    // console.log('login request', request);
    const formData = await request.formData();
    console.log('login formData', formData)

    // seperate the data for validations
    const phone_no = formData.get('phone_no');
    const password = formData.get('password');

    // TODO you can create validations here
    if (!phone_no) {
      return fail(400, {
        success: false,
        message: "Phone number is Required!.",
        // the data is dissapear after form actions is accur
        // return the from value to get back the value submitted
        // so user will not rewrite the forms from zero 
        value: {
          phone_no,
          password
        }
      })
    }
    if (phone_no.length < 9) {
      return fail(400, {
        success: false,
        message: "Phone number must be atleast two characters"
      })
    }
    if (!password) {
      return fail(400, {
        success: false,
        message: "Password is required!"
      })
    }
    // throw redirect(303, '/');
    return {
      success: true
    }
  }
} satisfies Actions;