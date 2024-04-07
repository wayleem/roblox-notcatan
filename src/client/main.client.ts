import { ReplicatedStorage } from "@rbxts/services";
import { local_store } from "client/local_store";
import Object from "@rbxts/object-utils";
import { makeHello } from "shared/module";

const remoteEvent = ReplicatedStorage.WaitForChild("UpdateClientEvent") as RemoteEvent;
remoteEvent.OnClientEvent.Connect((action) => {
	// only prints 1 time.
	// only catches player update, does not catch board update
	print("Received action from server: ", action);
	local_store.dispatch(action);
});

wait(12);
// this gives {}
print("client vertices: ", Object.keys(local_store.getState().board.vertices));
// this gives {}
print("client players: ", Object.keys(local_store.getState().players));

print(makeHello("main.client.ts"));
