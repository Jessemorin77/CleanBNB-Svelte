<script lang="ts">
  import { beforeNavigate } from "$app/navigation";
  import { metadata } from "$lib/app/stores";
  import { site } from "$lib/config";
  import Navbar from "$lib/components/Navbar.svelte";
  import Main from "$lib/components/Main.svelte";

  export let data: App.PageData & Record<string, any>;

  $: title = $metadata.title ? $metadata.title + " | " + site.name : site.name;
  $: description = $metadata.description ?? site.description;

  // reset metadata on navigation so that the new page inherits nothing from the old page
  beforeNavigate(() => {
    $metadata = {};
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<div class="min-h-full">
  <Navbar user={data.user} />
  <Main>
    <slot />
  </Main>
</div>
