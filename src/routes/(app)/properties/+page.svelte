
<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  $: ({ properties } = data);
</script>

<div class="bg-gray-900 min-h-screen flex flex-col justify-center items-center py-8">
  <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 text-center">
    Properties
  </h1>
  
  {#each properties as property}
    <div class="bg-gray-800 rounded-lg p-6 mb-4 w-80 text-white">
        <p>Address: {property.Address}</p>
        <p>City: {property.City}</p>
        <p>State: {property.State}</p>
        <p>Zip: {property.Zip}</p>
    </div>
  {/each}

  <a href="/properties/addProperty">Add Property</a>
  
</div>

