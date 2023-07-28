
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
  
  <form action="?/createListing" method="POST" class="w-80">
    <select id="propertyId" name="propertyId" class="input">
      {#each properties as property}
        <option value={property.id}>{property.Address}</option>
      {/each}
    </select>
    <input type="text" id="title" name="title" placeholder="Enter title" class="input" />
    <input type="number" id="budget" name="budget" placeholder="Enter budget" class="input" />
    <input type="text" id="contractorType" name="contractorType" placeholder="Enter contractor type" class="input" />
    <input type="text" id="description" name="description" placeholder="Enter description" class="input" />
    <input type="date" id="startDate" name="startDate" placeholder="Enter start date" class="input" />
    <input type="date" id="endDate" name="endDate" placeholder="Enter end date" class="input" />
    <label class="flex items-center text-white">
      <input type="checkbox" id="readyToHire" name="readyToHire" class="mr-2" />
      Ready to Hire
    </label>
    <input type="text" id="jobType" name="jobType" placeholder="Enter job type" class="input" />
    <button type="submit" class="btn">Submit</button>
  </form>
</div>

