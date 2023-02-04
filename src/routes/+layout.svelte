<script lang="ts">
  import Header from "../lib/components/Header.svelte";
  import PublicHeader from "../lib/components/PublicHeader.svelte";
</script>

<Header></Header>
<PublicHeader></PublicHeader>
<main>
  <slot />
</main>