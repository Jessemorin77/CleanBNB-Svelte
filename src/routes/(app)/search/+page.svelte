<script>
    import Modal from "../../../lib/components/Model.svelte";
    let showModal = false;
    let selectedBusiness = null; // Store the selected business data
    let services = ["Cleaner", "Plumber", "Carpenter", "Electrician"];
    let selectedService = "";
    let zipCode = "";
    let businessList = [];

    async function searchService() {
        const response = await fetch("/api/yelpAPI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ zipCode, service: selectedService })
        });
        if (!response.ok) {
            throw new Error("Network response was not ok" + response.statusText);
        }
        businessList = await response.json(); 
        console.log(businessList);
    }

    function openModal(business) {
        selectedBusiness = business;
        showModal = true;
    }
</script>

<div class="bg-gray-900 min-h-screen py-8">
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 text-center">
        Service Providers in your area
    </h1>

    <input placeholder="ZipCode:" bind:value={zipCode}/>
    <select bind:value={selectedService}>
        {#each services as service}
            <option value={service}>{service}</option>
        {/each}
    </select>
    <button class="text-white" on:click={searchService}>Search</button>
    <div>
        {#each businessList as business}
            <div class="business-card p-4 bg-white shadow-lg rounded-lg mb-4">
                <img class="h-32 w-full object-cover rounded-md" src={business.imageUrl} alt={business.name} />
                <h2 class="text-xl font-semibold mt-2">{business.name}</h2>
                <p class="text-gray-600">{business.address}</p>
                <p class="text-gray-600">{business.phone}</p>
                <p class="text-yellow-500">Rating: {business.rating} <span class="text-gray-600">/ 5</span></p>
                <button 
                    class="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700" 
                    on:click={() => openModal(business)}>
                    Contact Provider
                </button>
            </div>
        {/each}
    </div>
</div>

{#if showModal && selectedBusiness}
    <Modal bind:showModal>
        <h2 slot="header">{selectedBusiness.name}</h2>
        <div>
            <p>Address: {selectedBusiness.address}</p>
            <p>Phone: {selectedBusiness.phone}</p>
            <p>Rating: {selectedBusiness.rating}</p>
            <button 
                class="mt-2 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700" 
                on:click={() => window.open(`tel:${selectedBusiness.phone}`)}>
                Call Provider
            </button>
            <!-- Add button or form for scheduling here -->
        </div>
    </Modal>
{/if}
