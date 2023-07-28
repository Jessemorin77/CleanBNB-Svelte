
<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  // Destructure the properties from the data object
  $: ({ jobs } = data);

  async function handleSubmit(event: Event, jobId: string) {
    event.preventDefault();

    try {
      const res = await fetch(`/api/stripeCheckout?jobId=${jobId}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Error creating Stripe Checkout session");
      console.log("res", res, "hit Endpoint");
      const sessionData = await res.json();
      const sessionId = sessionData.url;
      if (!sessionId) throw new Error("Error creating Stripe Checkout session");
      console.log("sessionId", sessionId);
      const stripeCheckoutUrl = sessionId;
      window.location.href = stripeCheckoutUrl; // Redirect the user to the Stripe checkout page

    } catch (error) {
      console.error("Error creating Stripe Checkout session:", error);
    }
  }
</script>

<div class="bg-gray-900 min-h-screen py-8">
  <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 text-center">
    Jobs
  </h1>

  <div class="max-w-3xl mx-auto">
    {#each jobs as job}
      <div class="bg-gray-800 rounded-lg p-6 mb-4">
        <h2 class="text-white text-xl mb-2">Date: {job.jobDate}</h2>
        <p class="text-gray-300">Amount: {job.jobAmount}</p>
        <p class="text-gray-300">Status: {job.jobStatus}</p>
        <form on:submit={(event) => handleSubmit(event, job.id)} class="flex justify-end mt-4">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Pay
          </button>
        </form>
      </div>
    {/each}
  </div>
</div>

  
