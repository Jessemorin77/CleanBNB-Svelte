<script lang="ts">
    let services = ["Cleaner", "Plummer", "Carpenter", "Electrician"]
    let service = [""]
</script>

<div class="bg-gray-900 min-h-screen py-8">
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 text-center">
        Service Providers in your area
    </h1>

    <input placeholder="ZipCode:"/>
    <select multiple bind:value={services}>
        {#each services as service}
            <option value="service">
                {service}
            </option>
        {/each}
    </select>
</div>