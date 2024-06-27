// ClientStore.ts
import { BaseStore } from "shared/BaseStore";
import { client } from "client/remote";

export class ClientStore<A> extends BaseStore<A> {
	constructor(initialState: A, reducer: (state: A, action: MyActions<A>) => A) {
		super(initialState, reducer);

		client.OnClientEvent.Connect((action: MyActions<A>) => {
			this.dispatch(action);
		});
	}

	sendToServer(action: MyActions<A>): void {
		client.FireServer(action);
	}
}
