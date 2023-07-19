<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;

    $: ({ bids } = data);
</script>

<h>bids</h>
{#each bids as bid}
    <div>
        <p>Ammount: {bid.bidAmmount}</p>
        <p>Message: {bid.bidMessage}</p>
        <p>Status: {bid.bidStatus}</p>
        <form action="?/acceptBid&id={bid.id}" method="POST">
            <button type="submit">Accept</button>
        </form>
        <form action="?/declineBid&id={bid.id}" method="POST">
            <button type="submit">Decline</button>
        </form>
    </div>
{/each}
