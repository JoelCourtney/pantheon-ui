<script lang="ts">
    import {host, healthy} from "../../connection";

    let input_text: string = "";

    async function set_host() {
        if (input_text === "") {
            host.set("http://localhost");
        } else {
            host.set(`http://${input_text}`);
        }
    }
</script>

{#if !$healthy }
    <h1 class="subtitle">Connect to a content server:</h1>
    <div class="box">
        <form on:submit|preventDefault={set_host}>
            <div class="field has-addons">
                <p class="control">
                    <a class="button is-static">
                        http://
                    </a>
                </p>
                <div class="control is-expanded">
                    <input class="input" type="text" placeholder="localhost" bind:value={input_text}/>
                </div>

                <p class="control">
                    <button class="button is-primary" type="submit">Connect</button>
                </p>
            </div>
        </form>
    </div>
{:else}

{/if}
