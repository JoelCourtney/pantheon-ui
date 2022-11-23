<script lang="ts">
    import { healthy, disconnect, connection_error } from "../../connection";
</script>

<nav class="navbar" style="padding: 1rem" aria-label="main navigation">
    <div class="navbar-brand">
        <a href="/"><img src="icon.png" width=60 alt="Pantheon" class="navbar-item" /></a>
        <a href="/"><div class="navbar-item"><h1 class="title">Pantheon</h1></div></a>
    </div>
    <div class="navbar-menu" id="navbar">
        <div class="navbar-start">
            { #if $healthy }
                <div class="navbar-item">
                    <div class="field is-grouped">
                        <p class="control">
                            <a class="button is-ghost" href="https://google.com">goog</a>
                        </p>
                    </div>
                </div>
            { /if }
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="field is-grouped">
                    <p class="control">
                        <a class="button is-danger" on:click={disconnect}>
                            <span>Disconnect</span>
                        </a>
                    </p>
                    <p class="control">
                        <a class="button" href="https://github.com/JoelCourtney/pantheon">
                            <span>Github</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</nav>

{#if $connection_error !== undefined}
    <section class="section">
        <div class="container is-max-desktop">
            <article class="message is-danger">
                <div class="message-header">
                    <p>Content server connection failed: {$connection_error.status}</p>
                    <button class="delete" aria-label="delete" on:click={disconnect}></button>
                </div>
                <div class="message-body">
                    {@html $connection_error.error}
                </div>
            </article>
        </div>
    </section>
{/if}

<section class="section">
    <div class="container is-max-desktop">
        <slot/>
    </div>
</section>
