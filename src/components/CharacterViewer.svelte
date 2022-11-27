<script lang="ts">
    import {state} from "../connection";
</script>

{#if $state.connected}
    {#each $state.character_viewer.paths as path}
        <p>{path}</p>
    {/each}
{/if}