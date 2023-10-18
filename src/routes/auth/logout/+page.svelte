<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
  let isAuth = data.locals.isAuth;
  if (!isAuth) {
    location.href = '/auth/login'; 
  }
</script>