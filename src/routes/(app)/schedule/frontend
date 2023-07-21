<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
  
    export let data;
    $: ({ jobs } = data);
    async function handleSubmit(event: Event, jobId: string) {
      event.preventDefault();
  
      try {
        const response = await fetch(`/createCheckout&id=${jobId}`, {
          method: "POST",
        });
  
        if (response.ok) {
          const sessionData = await response.json();
          const sessionId = sessionData.sessionId;
          const stripeCheckoutUrl = `https://checkout.stripe.com/${sessionId}`;
          window.location.href = stripeCheckoutUrl; // Redirect the user to the Stripe checkout page
        } else {
          // Handle error response
          console.error("Failed to create checkout session.");
        }
      } catch (error) {
        console.error("Error while processing the request:", error);
      }
    }
  </script>
  
  <h1>schedule</h1>
  
  <div>jobs:</div>
  {#each jobs as job}
    <div>
      JobDate: {job.jobDate}
    </div>
    <div>
      JobStatus: {job.jobStatus}
    </div>
    <div>
      Job Amount: ${job.jobAmount}
    </div>
    <div>
      contractorId: {job.contractorId}
    </div>
    <form on:submit={(event) => handleSubmit(event, job.id)}>
      <button type="submit">Pay</button>
    </form>
  {/each}
  