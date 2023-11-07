<script lang="ts">
    import type { PageData } from "./$types";
  
</script>

<div>
    <h1>Add Property</h1>
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