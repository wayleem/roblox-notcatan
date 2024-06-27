// ServerStore.ts

import { server } from "client/remote";
import { BaseStore } from "shared/BaseStore";

export class ServerStore<A, B> extends BaseStore<A & B> {
	constructor(initialState: A & B, reducer: (state: A & B, action: MyActions<A & B>) => A & B) {
		super(initialState, reducer);
	}

	broadcastToClients(action: MyActions<A>): void {
		server.FireAllClients(action);
	}
}
