<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;

    $: ({ listings, properties } = data);
</script>

<h>listings</h>
{#each listings as listing}
    <div>
        <p>title: {listing.title}</p>
        <p>budget: {listing.budget}</p>
        <p>description: {listing.description}</p>
        <p>startDate: {listing.startDate}</p>
        <p>endDate: {listing.endDate}</p>
        <p>Ready to Hire: {listing.readyToHire}</p>
        <p>Job Type: {listing.jobType}</p>
    </div>
{/each}

<form action="?/createListing" method="POST">

    <select id="propertyId" name="propertyId">
    {#each properties as property}
        <option value={property.id} >
            {property.Address} 
        </option>
    {/each}
        
    </select>
    <input type="text" id="title" name="title" placeholder="Enter title" />
    <input type="number" id="budget" name="budget" placeholder="Enter budget" />
    <input type="text" id="contractorType" name="contractorType" placeholder="Enter contractor type" />
    <input type="text" id="description" name="description" placeholder="Enter description" />
    <input type="date" id="startDate" name="startDate" placeholder="Enter start date" />
    <input type="date" id="endDate" name="endDate" placeholder="Enter end date" />
    <input type="checkbox" id="readyToHire" name="readyToHire" placeholder="Enter ready to hire" />
    <input type="text" id="jobType" name="jobType" placeholder="Enter job type" />
    <button type="submit">Submit</button>
</form>