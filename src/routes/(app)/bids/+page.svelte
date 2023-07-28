
<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  $: ({ bids } = data);
</script>

<div class="bg-gray-900 min-h-screen flex flex-col justify-center items-center py-8">
  <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 text-center">
    Bids
  </h1>

  {#each bids as bid}
    <div class="bg-gray-800 rounded-lg p-6 mb-4 w-80 text-white">
      <p>Amount: {bid.bidAmount}</p>
      <p>Message: {bid.bidMessage}</p>
      <p>Status: {bid.bidStatus}</p>
      <div class="flex justify-center mt-4">
        <form action="?/acceptBid&id={bid.id}" method="POST">
          <button type="submit" class="btn btn-green mr-2">Accept</button>
        </form>
        <form action="?/declineBid&id={bid.id}" method="POST">
          <button type="submit" class="btn btn-red">Decline</button>
        </form>
      </div>
    </div>
  {/each}
</div>

