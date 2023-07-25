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
        if (!res.ok) throw new Error("Error creating Stripe Checkout session"
        );
        console.log("res", res, "hit Endpoint");
        const sessionData = await res.json();
        const sessionId = sessionData.url;
        if (!sessionId) throw new Error("Error creating Stripe Checkout session"
        );
        console.log("sessionId", sessionId);
        const stripeCheckoutUrl = sessionId;
        window.location.href = stripeCheckoutUrl; // Redirect the user to the Stripe checkout page

      } catch (error) {
        console.error("Error creating Stripe Checkout session:", error);
      }
    }
  </script>
  
  <!-- Your job list -->
  {#each jobs as job}
    <div>
      <h2>Date: {job.jobDate}</h2>
      <p>Amount: {job.jobAmount}</p>
      <p>Status: {job.jobStatus}</p>
      <form on:submit={(event) => handleSubmit(event, job.id)}>
        <button type="submit">Pay</button>
      </form>
    </div>
  {/each}
  