
<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  $: ({ listings, properties } = data);
</script>

<div class="bg-gray-900 min-h-screen flex flex-col justify-center items-center py-8">
  <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 text-center">
    Listings
  </h1>
  
  {#each listings as listing}
    <div class="bg-gray-800 rounded-lg p-6 mb-4 w-80 text-white">
      <p>Title: {listing.title}</p>
      <p>Budget: {listing.budget}</p>
      <p>Description: {listing.description}</p>
      <p>Start Date: {listing.startDate}</p>
      <p>End Date: {listing.endDate}</p>
      <p>Ready to Hire: {listing.readyToHire}</p>
      <p>Job Type: {listing.jobType}</p>
    </div>
  {/each}

  <a href="/listings/addListing">Add Listing</a>
  
  
</div>

