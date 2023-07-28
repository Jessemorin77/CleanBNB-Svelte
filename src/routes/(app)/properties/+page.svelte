
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
  
  <form action="?/createProperty" method="POST" class="w-80">
    <input type="text" id="Address" name="Address" placeholder="Enter address" class="input" />
    <input type="text" id="City" name="City" placeholder="Enter city" class="input" />
    <input type="text" id="State" name="State" placeholder="Enter state" class="input" />
    <input type="number" id="Zip" name="Zip" placeholder="Enter ZIP code" class="input" />
    <input type="number" id="Beds" name="Beds" placeholder="Enter number of beds" class="input" />
    <input type="number" id="Baths" name="Baths" placeholder="Enter number of baths" class="input" />
    <input type="number" id="Sqft" name="Sqft" placeholder="Enter square footage" class="input" />
    <input type="text" id="Type" name="Type" placeholder="Enter property type" class="input" />
    <input type="text" id="Status" name="Status" placeholder="Enter property status" class="input" />
    <input type="text" id="Desc" name="Desc" placeholder="Enter property description" class="input" />
    <button type="submit" class="btn">Submit</button>
  </form>
</div>

