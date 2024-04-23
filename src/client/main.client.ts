import { Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import Object from "@rbxts/object-utils";
import { makeHello } from "shared/module";
import { local_store } from "./local_store";

const remoteEvent = ReplicatedStorage.WaitForChild("UpdateClientEvent") as RemoteEvent;
remoteEvent.OnClientEvent.Connect((action) => {
	print("Received action from server: ", action);
	local_store.dispatch(action);
});

Players.LocalPlayer.CharacterAdded.Connect((c) => {
	print("client vertices: ", Object.values(local_store.getState().board.vertices));

	print("client's resources: ", local_store.getState().player.resources);
});

const button = Workspace.WaitForChild("GetResource").WaitForChild("ClickDetector") as ClickDetector;

const clientButton = Workspace.WaitForChild("TestClient").WaitForChild("ClickDetector") as ClickDetector;

button.MouseClick.Connect(() => {
	wait(1);
	print("updated client's resources: ", local_store.getState().player.resources);
});

clientButton.MouseClick.Connect(() => {
	const vertices = local_store.getState().board.vertices;
	Object.values(vertices).forEach((vertex) => {
		vertex.part.BrickColor = new BrickColor("Bright red");
	});
});

print(makeHello("main.client.ts"));
