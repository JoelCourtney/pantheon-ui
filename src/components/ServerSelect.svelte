<script lang="ts">
    import {connect} from "../connection";

    let input_text: string = "";

    async function set_host() {
        if (input_text === "") {
            await connect("http://localhost");
        } else {
            await connect(`http://${input_text}`);
        }
    }
</script>

<h1 class="subtitle">Connect to a content server:</h1>
<div class="box">
    <form on:submit|preventDefault={set_host}>
        <div class="field has-addons">
            <p class="control">
                <button class="button is-static">
                    http://
                </button>
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