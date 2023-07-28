

<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  $: ({ rooms } = data);
</script>

<div class="bg-gray-900 min-h-screen py-8">
  <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 text-center">
    Chat Rooms
  </h1>

  <div class="max-w-3xl mx-auto">
    {#each rooms as room}
      <a href="/chat/{room.id}" class="block bg-gray-800 rounded-lg p-6 mb-4 hover:bg-gray-700">
        <p class="text-white text-xl">Room Name: {room.name}</p>
      </a>
    {/each}
  </div>
</div>

