<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;

    $: ({ messages } = data);
</script>

<div>Messages</div>
{#each messages as message}
    <div>
        <p>Message: {message.content}</p>
        <!-- Display the sender information -->
        <p>Sender: {message.sender.email}</p>
        <!-- Display the receiver information -->
        {#if message.receiver}
            <p>Receiver: {message.receiver.email}</p>
        {/if}
        <p>Time: {message.sentAt}</p>
    </div>
{/each}

<form action="?/sendMessage" method="POST">
    <input type="text" id="content" name="content" placeholder="Enter message" />
    <button type="submit">Submit</button>
</form>