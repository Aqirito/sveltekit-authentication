<script lang="ts">
  import Header from "../lib/components/Header.svelte";
  import PublicHeader from "../lib/components/PublicHeader.svelte";
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<Header data={data}></Header>
<PublicHeader data={data}></PublicHeader>
<main>
  <slot />
</main>