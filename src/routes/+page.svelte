<script lang="ts">
    import CharacterViewer from "../components/CharacterViewer.svelte";
    import ServerSelect from "../components/ServerSelect.svelte";
    import ContentBrowser, {toggle_content} from "../components/ContentBrowser.svelte";
    import {state, connect, disconnect, type Connected} from "../connection";

</script>

<nav class="navbar" style="padding: 1rem" aria-label="main navigation">
    <div class="navbar-brand">
        <a href="/"><img src="icon.png" width=60 alt="Pantheon" class="navbar-item" /></a>
        <a href="/"><div class="navbar-item"><h1 class="title">Pantheon</h1></div></a>
    </div>
    <div class="navbar-menu" id="navbar">
        <div class="navbar-start">
            {#if $state.connected}
                <div class="navbar-item">
                    <button class="button" on:click={toggle_content}>Content</button>
                </div>
            {/if}
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    {#if $state.connected}
                        <button class="button is-danger" on:click={disconnect}>Disconnect</button>
                    {/if}
                    <a class="button" href="https://github.com/JoelCourtney/pantheon">Github</a>
                </div>
            </div>
        </div>
    </div>
</nav>

{#if !$state.connected && $state.error !== undefined}
    <section class="section">
        <div class="container is-max-desktop">
            <article class="message is-danger">
                <div class="message-header">
                    <p>Content server connection failed: {$state.error.status}</p>
                    <button class="delete" aria-label="delete" on:click={disconnect}></button>
                </div>
                <div class="message-body">
                    {@html $state.error.message}
                </div>
            </article>
        </div>
    </section>
{/if}

<section class="section">
    <div class="container is-max-desktop">
        {#if !$state.connected }
            <ServerSelect></ServerSelect>
        {:else}
            <CharacterViewer></CharacterViewer>
            <ContentBrowser></ContentBrowser>
        {/if}
    </div>
</section>

