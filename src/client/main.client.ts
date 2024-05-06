import { Players, ReplicatedStorage, StarterGui, Workspace } from "@rbxts/services";
import Object from "@rbxts/object-utils";
import { makeHello } from "shared/module";
import { local_store } from "./local_store";
import { MyActions } from "shared/actions";
import Roact from "@rbxts/roact";
import end_turn_button from "./ui/end_turn_button";

const serverToClientEvent = ReplicatedStorage.WaitForChild("UpdateClientEvent") as RemoteEvent;
serverToClientEvent.OnClientEvent.Connect((action: MyActions<any>) => {
	//print("Received action from server: ", action);
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
	/*
  const vertices = local_store.getState().board.vertices;
  Object.values(vertices).forEach((vertex) => {
    vertex.part.BrickColor = new BrickColor("Bright red");
  });
  */
	const folder = Workspace.WaitForChild("vertices") as Folder;
	const vertices = folder.GetChildren() as Part[];
	vertices.forEach((v: Part) => {
		v.BrickColor = new BrickColor("Bright red");
	});
});

print(makeHello("main.client.ts"));

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

const screenGui = playerGui.WaitForChild("ScreenGui") as ScreenGui;

// Mount the EndTurnButton component
Roact.mount(end_turn_button(), screenGui);
