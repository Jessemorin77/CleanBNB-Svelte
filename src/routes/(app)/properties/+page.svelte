<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;

    $: ({ properties } = data);
</script>

<h>properties</h>
{#each properties as property}
    <div>
        <p>Address: {property.Address}</p>
        <p>City: {property.City}</p>
        <p>State: {property.State}</p>
        <p>Zip: {property.Zip}</p>
    </div>
{/each}
<form action="?/createProperty" method="POST">
    <input type="text" id="Address" name="Address" placeholder="Enter address" />
    <input type="text" id="City" name="City" placeholder="Enter city" />
    <input type="text" id="State" name="State" placeholder="Enter state" />
    <input type="number" id="Zip" name="Zip" placeholder="Enter ZIP code" />
    <input type="number" id="Beds" name="Beds" placeholder="Enter number of beds" />
    <input type="number" id="Baths" name="Baths" placeholder="Enter number of baths" />
    <input type="number" id="Sqft" name="Sqft" placeholder="Enter square footage" />
    <input type="text" id="Type" name="Type" placeholder="Enter property type" />
    <input type="text" id="Status" name="Status" placeholder="Enter property status" />
    <input type="text" id="Desc" name="Desc" placeholder="Enter property description" />
    <button type="submit">Submit</button>
</form>
