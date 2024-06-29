class BaseStore<A extends SharedState, B, AB = A & B> {
	protected state: AB;
	protected remoteEvent: RemoteEvent;
	private handlers = new Map<string, (player: Player | undefined, payload: any) => void>();

	constructor(initialSharedState: A, remoteEvent: RemoteEvent, serverState?: B) {
		this.state = initialSharedState as unknown as AB;
		if (serverState) {
			this.state = { ...this.state, ...serverState };
		}
		this.remoteEvent = remoteEvent;

		// Set up event listener
		if (game.GetService("RunService").IsServer()) {
			this.remoteEvent.OnServerEvent.Connect((player: Player, data: unknown) => {
				this.handleEvent(player, data as Payload);
			});
		} else {
			this.remoteEvent.OnClientEvent.Connect((data: unknown) => {
				this.handleEvent(undefined, data as Payload);
			});
		}
	}

	private handleEvent(player: Player | undefined, payload: Payload) {
		const handler = this.handlers.get(payload.event);
		if (handler) {
			try {
				handler(player, payload);
			} catch (err) {
				warn(`Error in handler for event "${payload.event}": ${err}`);
			}
		} else {
			warn(`No handler registered for event: ${payload.event}`);
		}
	}

	registerHandler<T = unknown>(event: string, fn: (player: Player | undefined, payload: Payload<T>) => void) {
		if (this.handlers.has(event)) {
			warn(`Handler for event "${event}" is being overwritten.`);
		}
		this.handlers.set(event, fn as (player: Player | undefined, payload: any) => void);
	}

	protected broadcast(event: string, data: unknown) {
		if (game.GetService("RunService").IsServer()) {
			this.remoteEvent.FireAllClients({ event, data } as Payload);
		} else {
			warn("Attempted to broadcast from client-side store");
		}
	}

	protected sendToServer<T = unknown>(event: string, data: T) {
		if (game.GetService("RunService").IsClient()) {
			this.remoteEvent.FireServer({ event, data } as Payload<T>);
		} else {
			warn("Attempted to send to server from server-side store");
		}
	}

	getState(): AB {
		return this.state;
	}

	update<K extends keyof AB>(key: K, value: AB[K]) {
		this.state[key] = value;
		this.broadcast("stateUpdate", { key, value });
	}

	create(data: Partial<AB>) {
		this.state = { ...this.state, ...data } as AB;
		this.broadcast("stateCreate", data);
	}

	delete<K extends keyof AB>(key: K) {
		delete this.state[key];
		this.broadcast("stateDelete", key);
	}
}

export class ServerStore<A extends SharedState, B extends ServerState> extends BaseStore<A, B> {
	constructor(initialSharedState: A, remoteEvent: RemoteEvent, serverState: B) {
		super(initialSharedState, remoteEvent, serverState);
	}
}

export class ClientStore<A extends SharedState> extends BaseStore<A, {}> {
	constructor(initialSharedState: A, remoteEvent: RemoteEvent) {
		super(initialSharedState, remoteEvent);

		// Set up handlers for state updates from server
		this.registerHandler<{ key: keyof A; value: any }>("stateUpdate", (_, payload) => {
			const { key, value } = payload.data;
			this.state[key] = value;
		});

		this.registerHandler<Partial<A>>("stateCreate", (_, payload) => {
			this.state = { ...this.state, ...payload.data } as A;
		});

		this.registerHandler<keyof A>("stateDelete", (_, payload) => {
			delete this.state[payload.data];
		});
	}
}
