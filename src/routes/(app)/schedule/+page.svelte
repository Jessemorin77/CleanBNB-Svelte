<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
  
    // Destructure the properties from the data object
    $: ({ jobs } = data);

    async function handleSubmit(event: Event, jobId: string) {
       
  
      
        
        
          const sessionData = await response.json();
          const sessionId = sessionData.sessionId;
          const stripeCheckoutUrl = `https://checkout.stripe.com/${sessionId}`;
          window.location.href = stripeCheckoutUrl; // Redirect the user to the Stripe checkout page
       
}
  </script>
  
  {#each jobs as job}
  //style this with taiwind
    <div >
      <h2>Date: {job.jobDate}</h2>
      <p>Ammount: {job.jobAmount}</p>
      <p>Status: {job.jobStatus}</p>
      <form on:submit={(event) => handleSubmit(event, job.id)}>
      <button type="submit">Pay</button>
    </form>
    </div>  
  {/each}