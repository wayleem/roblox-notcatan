import { ServerStorage, Players, ReplicatedStorage } from "@rbxts/services";
import { store } from "server/store";
import Object from "@rbxts/object-utils";
import generate_board from "./game/generate_board";
import { on_player_join, on_player_leave } from "./players/connection";
import { makeHello } from "shared/module";

/*
const updateClientEvent = new Instance("RemoteEvent") as RemoteEvent;
updateClientEvent.Name = "UpdateClientEvent";
updateClientEvent.Parent = ReplicatedStorage;
*/

generate_board(2, 10);

// this is correct
print("server vertices: ", Object.keys(store.getState().board.vertices));

const players = store.getState().players;
print("players:" + players);
Players.PlayerAdded.Connect((player) => {
	print("player joined:", player.Name);
	on_player_join(player);

	const playerIds = Object.keys(store.getState().players);

	print("Current player IDs in the store:", playerIds);
});
Players.PlayerRemoving.Connect((player) => {
	print("Player leaving:", player.Name);
	on_player_leave(player);

	const playerIds = Object.keys(store.getState().players);

	print("Current player IDs in the store:", playerIds);
});

print(makeHello("main.server.ts"));
