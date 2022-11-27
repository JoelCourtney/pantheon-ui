import { writable, type Writable } from "svelte/store";

export let state: Writable<NotConnected | Connected> = writable({connected: false});

export interface NotConnected {
    connected: false,
    error?: ConnectionError
}
export interface Connected {
    connected: true,
    host: string,
    layout: any,
    character_viewer: CharacterState,
    content_browser: ContentBrowserState
}

export interface ConnectionError {
    status: number,
    message: string
}

export interface CharacterState {
    paths: string[],
    current?: string
}

export interface ContentBrowserState {
    paths: string[],
    visible: boolean,
    history: string[],
    current?: number
}

interface ContentLists {
    characters: string[],
    files: string[]
}

export async function connect(host: string): Promise<void> {
    try {
        let response = await fetch(`${host}/list`, { method: "POST" });
        if (response.ok) {
            let lists = await response.json() as ContentLists;
            state.set({
                connected: true,
                host,
                layout: {},
                character_viewer: {
                    paths: lists.characters
                },
                content_browser: {
                    paths: lists.files,
                    visible: false,
                    history: []
                }
            });
        } else {
            state.set({
                connected: false,
                error: {
                    status: response.status,
                    message: await response.text(),
                }
            });
        }
    } catch(e: any) {
        state.set({
            connected: false,
            error: {
                status: 418,
                message: e.toString(),
            }
        });
    }
}

export function disconnect() {
    state.set({
        connected: false
    });
}
