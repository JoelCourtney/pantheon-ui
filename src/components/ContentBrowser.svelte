<script lang="ts" context="module">
    export function toggle_content() {
        state.update($ => {
            if ($.connected) {
                $.content_browser.visible = !$.content_browser.visible;
            }
            return $;
        });
    }
</script>
<script lang="ts">
    import {state} from "../connection";
    import {compareTwoStrings} from "string-similarity";

    let search_string: string = "";

    let searches: Record<string, string[]> = {};

    function filter_files(search: string, files: string[]): string[] {
        search = search.toLowerCase();
        let ranks = files.map(f => {return {
            rank: compareTwoStrings(search, f.toLowerCase()),
            path: f
        };}).sort((l, r) => r.rank - l.rank)
        return ranks.slice(0, 10).map(o => o.path);
    }
</script>

{#if $state.connected && $state.content_browser.visible}
    <div class="modal is-active">
        <div class="modal-background" on:click={toggle_content}></div>
        {#if $state.content_browser.current === undefined}
        <div class="modal-content">
            <div class="card panel">
                <header class="modal-card-head">
                    <p class="modal-card-title">Find content</p>
                    <button class="delete" aria-label="close" on:click={toggle_content}></button>
                </header>
                <div class="panel-block">
                    <p class="control">
                        <input class="input" type="text" placeholder="Search" bind:value={search_string}/>
                    </p>
                </div>
                <div class="panel-tabs">
                    <button class="button is-ghost is-active">All</button>
                    <button class="button is-ghost">Public</button>
                </div>
                {#each filter_files(search_string, $state.content_browser.paths) as file}
                    <span class="panel-block">
                        {file}
                    </span>
                {/each}
            </div>
        </div>
        {:else}
            <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Modal title</p>
                <button class="delete" aria-label="close" on:click={toggle_content}></button>
            </header>
            <section class="modal-card-body">
                <p>hey there</p>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">Save changes</button>
                <button class="button">Cancel</button>
            </footer>
            </div>
        {/if}
    </div>
{/if}
