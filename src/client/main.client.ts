import { Players, ReplicatedStorage } from "@rbxts/services";
import { local_store } from "client/local_store";
import Object from "@rbxts/object-utils";
import { makeHello } from "shared/module";

const remoteEvent = ReplicatedStorage.WaitForChild("UpdateClientEvent") as RemoteEvent;
remoteEvent.OnClientEvent.Connect((action) => {
  print("Received action from server: ", action);
  local_store.dispatch(action);
});

Players.LocalPlayer.CharacterAdded.Connect((c) => {
  // this gives {}
  print("client vertices: ", Object.keys(local_store.getState().board.vertices));
  // this gives {}
  print("client players: ", Object.keys(local_store.getState().player));
});

print(makeHello("main.client.ts"));
