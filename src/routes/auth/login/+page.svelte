<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
  import type { PageData } from './$types';
  
  export let data: PageData;
  console.log('data', data);
  export let action: any;
  console.log('server', action);
</script>

<h1>{JSON.stringify(data)}</h1>

<form method="POST" use:enhance = {
  ({ form }) => {
    return async ({ result, update }) => {
      // reset forms if success
      if (result.type === 'success') {
        form.reset();
      }
      if (result.type === 'failure') {
        // apply action to browser javascript
        await applyAction(result);
      }
      update();
    }
  }
}>
  <label for="phone_no">Phone Number</label>
  <input name="phone_no" id="phone_no" type="text">
  <label for="password">Password</label>
  <input name="password" id="password" type="password">
  <button type="submit">Submit</button>
</form>