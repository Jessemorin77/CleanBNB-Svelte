<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;

    $: ({ rooms } = data);
</script>

<h1>chat</h1>

{#each rooms as room}
<div>
    <a href="/chat/{room.id}">

    Room Name: {room.name}  
    </a>
</div>
{/each}