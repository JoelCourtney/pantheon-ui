import { writable, type Writable } from "svelte/store";

export const host: Writable<string | undefined> = writable(undefined);