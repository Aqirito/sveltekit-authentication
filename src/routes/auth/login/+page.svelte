<script lang="ts">
	import { applyAction, enhance } from "$app/forms";

  export let form: any;
  export let data: any;
  console.log('form', form);
  console.log('data', data);
</script>

<form method="POST" use:enhance={
  ({ form }) => {
    return async ({ result, update }) => {
      console.log(result.type);
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
  <label>
    Username
    <input name="username" value="{form?.value?.username ?? ''}" type="text">
  </label>
  <label>
    Password
    <input name="password" value="{form?.value?.password ?? ''}" type="password">
  </label>
  <button>Log in</button>
</form>

{#if form?.success === false}
  <h1>
    error: {form?.message}
  </h1>
{/if}