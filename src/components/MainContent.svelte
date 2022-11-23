<script lang="typescript" context="module">
    export type Link = {
        label: string,
        url: string
    };
</script>

<script lang="typescript">
    export let links: Link[] = [];
</script>

<nav class="navbar" style="padding: 1rem" aria-label="main navigation">
    <div class="navbar-brand">
        <a href="/"><img src="icon.png" width=60 alt="Pantheon" class="navbar-item" /></a>
        <a href="/"><div class="navbar-item"><h1 class="title">Pantheon</h1></div></a>
    </div>
    <div class="navbar-menu" id="navbar">
        <div class="navbar-start">
            { #each links as {label, url} }
                <a href={url} class="navbar-item">{label}</a>
            { /each }
        </div>
        <div class="navbar-end">
            <a href="https://github.com/JoelCourtney/pantheon" class="navbar-item">Github</a>
        </div>
    </div>
</nav>

<section class="section">
    <div class="container is-max-desktop">
        <slot></slot>
    </div>
</section>