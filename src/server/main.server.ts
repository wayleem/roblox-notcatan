import { ServerStorage, Players } from "@rbxts/services";
import { store } from "shared/store";
import Object from "@rbxts/object-utils";
import { makeHello } from "shared/module";
import generate_board from "./game/generate_board";
import { Vertex } from "shared/types";
import { on_player_join, on_player_leave } from "./players/connection";

generate_board(2, 10);

const global_store = store.getState();

const board = global_store.board;
const players = global_store.game.players;

print(players);
Players.PlayerAdded.Connect((player) => {
	print("player joined:", player.Name);
	on_player_join(player);

	const playerIds = Object.keys(store.getState().game.players);

	print("Current player IDs in the store:", playerIds);
});
Players.PlayerRemoving.Connect((player) => {
	print("Player leaving:", player.Name);
	on_player_leave(player);

	// Obtain all player IDs from the 'players' object within your store's state
	const playerIds = Object.keys(store.getState().game.players);

	// Print out the player IDs
	print("Current player IDs in the store:", playerIds);
});

const remoteEvent = new Instance("RemoteEvent") as RemoteEvent;

print(makeHello("main.server.ts"));
