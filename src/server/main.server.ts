import { ServerStorage, Players, ReplicatedStorage } from "@rbxts/services";
import { store } from "server/store";
import Object from "@rbxts/object-utils";
import generate_board from "./game/generate_board";
import { on_player_join, on_player_leave } from "./players/connection";
import { makeHello } from "shared/module";
import { flush } from "shared/actions";
import { deserialize_userid, serialize_userid } from "shared/utils";

/*
const updateClientEvent = new Instance("RemoteEvent") as RemoteEvent;
updateClientEvent.Name = "UpdateClientEvent";
updateClientEvent.Parent = ReplicatedStorage;
*/

// dispatch board update
generate_board(2, 10);

// dispatch player update
Players.PlayerAdded.Connect((player) => {
	print("player joined:", player.Name);
	on_player_join(player);

	const allPlayerIds = Object.keys(store.getState().players);

	print("Current player IDs in the store:", allPlayerIds);
});
Players.PlayerRemoving.Connect((player) => {
	print("Player leaving:", player.Name);
	on_player_leave(player);

	const allPlayerIds = Object.keys(store.getState().players);

	print("Current player IDs in the store:", allPlayerIds);
});

// this is correct
print("server vertices: ", Object.keys(store.getState().board.vertices));

print(makeHello("main.server.ts"));
