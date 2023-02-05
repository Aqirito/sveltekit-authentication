<script lang="ts">
  export let data: any;
  // console.log('header data', data)
</script>

{#if !data.locals.isAuth}
  <header>
    <ul class="top-nav">
      <li><a href="/">Home</a></li>
      <li><a href="/auth/login">Login</a></li>
      <li><a href="/auth/register">Register</a></li>
    </ul>
  </header>
{/if}

<style>
  header {
    display: flex;
    justify-content: center;
    background-color: rgb(166, 255, 227);
  }
  ul.top-nav {
    padding: 10px;
  }
  ul.top-nav li {
    cursor: pointer;
    padding: 10px;
    display: inline;
    border: solid rgb(219, 101, 101);
    border-radius: 10px;
  }
  ul.top-nav li:hover {
    background-color: rgb(118, 244, 204);
  }
</style>