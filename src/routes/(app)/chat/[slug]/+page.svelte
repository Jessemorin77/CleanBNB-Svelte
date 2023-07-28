
<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  $: ({ messages } = data);
</script>

<div class="bg-gray-900 min-h-screen py-8">
  <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 text-center">
    Messages
  </h1>

  <div class="max-w-3xl mx-auto">
    {#each messages as message}
      <div class="bg-gray-800 rounded-lg p-6 mb-4">
        <p class="text-white">Message: {message.content}</p>
        <!-- Display the sender information -->
        <p class="text-gray-400">Sender: {message.sender.email}</p>
        <!-- Display the receiver information -->
        {#if message.receiver}
          <p class="text-gray-400">Receiver: {message.receiver.email}</p>
        {/if}
        <p class="text-gray-400">Time: {message.sentAt}</p>
      </div>
    {/each}
  </div>

  <form action="?/sendMessage" method="POST" class="max-w-3xl mx-auto flex items-center">
    <input
      type="text"
      id="content"
      name="content"
      placeholder="Enter message"
      class="flex-1 p-2 rounded-l-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      type="submit"
      class="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Send
    </button>
  </form>
</div>

