import adapter from "@sveltejs/adapter-static"; 
import preprocess from "svelte-preprocess";

const dev = process.env.DEV;

/** @type {import(""@sveltejs/kit").Config} */
const config = {
    kit: {
        adapter: adapter({
            pages: "docs",
            assets: "docs"
        }),
        paths: {
            // change below to your repo name
            base: dev ? "" : "/pantheon-ui",
        },
    },
	preprocess: preprocess()
};

export default config;