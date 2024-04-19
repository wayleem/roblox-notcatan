import { Players, ReplicatedStorage } from "@rbxts/services";
import Object from "@rbxts/object-utils";
import { makeHello } from "shared/module";
import { local_store } from "./local_store";

const remoteEvent = ReplicatedStorage.WaitForChild("UpdateClientEvent") as RemoteEvent;
remoteEvent.OnClientEvent.Connect((action) => {
	print("Received action from server: ", action);
	local_store.dispatch(action);
});

Players.LocalPlayer.CharacterAdded.Connect((c) => {
	print("client vertices: ", Object.keys(local_store.getState().board.vertices));

	print("client's data: ", local_store.getState().player);
});

print(makeHello("main.client.ts"));
