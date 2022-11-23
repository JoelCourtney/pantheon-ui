import { writable, type Writable } from "svelte/store";

export const host: Writable<string | undefined> = writable();

export const healthy: Writable<boolean> = writable(false);

type ConnectionError = {
    status: number,
    error: string
}
export const connection_error: Writable<ConnectionError | undefined> = writable();

async function test_connection(host: string | undefined): Promise<void> {
    if (host === undefined) {
        healthy.set(false);
        connection_error.set(undefined);
        return;
    }
    try {
        let response = (await fetch(`${host}/health`));
        healthy.set(response.ok);
        if (!response.ok) {
            connection_error.set(
                {
                    status: response.status,
                    error: await response.text()
                }
            )
        } else {
            connection_error.set(undefined);
        }
    } catch(e: any) {
        healthy.set(false);
        connection_error.set(
            {
                status: 418,
                error: e.toString()
            }
        )
    }
}
host.subscribe(test_connection);

export function disconnect() {
    healthy.set(false);
    host.set(undefined);
    connection_error.set(undefined);
}
