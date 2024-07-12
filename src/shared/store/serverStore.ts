import BaseStore from "./baseStore";
import * as log from "../log";
import Object from "@rbxts/object-utils";

export class ServerStore<A extends SharedState, B extends ServerState, AB = A & B> extends BaseStore<A, B> {
	constructor(initialSharedState: A, remoteEvent: RemoteEvent, serverState: B) {
		super(initialSharedState, remoteEvent, serverState);

		this.registerHandler("NEW_CLIENT", (player) => {
			if (player) {
				const sharedState = this.getState() as A; // Only send shared state to client
				this.remoteEvent.FireClient(player, { event: "FLUSH", data: sharedState });
			}
		});
	}

private getSharedState(): Partial<A> {
    const fullState = this.store.getState();
    return (Object.keys(fullState) as (keyof AB)[]).reduce((sharedState, key) => {
        if (this.isSharedKey(key)) {
            (sharedState as any)[key] = fullState[key];
        }
        return sharedState;
    }, {} as Partial<A>);
}
	broadcast(state: A) {
		this.remoteEvent.FireAllClients({ event: "BROADCAST", data: state });
	}

	remote<T>(event: string, data?: T, target: Player) {
		this.remoteEvent.FireClient(target, { event, data });
	}

	update<K extends keyof AB>(key: K, value: AB[K]) {
		const action: UpdateAction<AB> = { type: "UPDATE", key, value };
		this.store.dispatch(action);
		this.broadcast(this.store.getState() as A);
		}
	}

	create(data: Partial<AB>) {
		const action: CreateAction<AB> = { type: "CREATE", data };
		this.store.dispatch(action);
				this.broadcast({ type: "CREATE", data: sharedData } as StoreAction<A>);
			}
		}
	}

	delete<K extends keyof AB>(key: K) {
		const action: DeleteAction<AB> = { type: "DELETE", key };
		this.store.dispatch(action);
		if (game.GetService("RunService").IsServer() && this.isSharedKey(key)) {
			this.broadcast(action as unknown as StoreAction<A>);
		}
	}
}
