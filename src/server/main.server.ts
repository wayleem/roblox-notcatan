import { ServerStorage, Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import { store } from "server/store";
import Object from "@rbxts/object-utils";
import generate_board from "./game/generate_board";
import { on_player_join, on_player_leave } from "./game/connection";
import { makeHello } from "shared/module";
import { flush, update } from "shared/actions";
import { deserialize_userid, serialize_userid, update_hand } from "shared/utils";
import { PlayerState } from "./store/players_reducer";

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
print("server vertices: ", Object.values(store.getState().board.vertices));

const button = Workspace.WaitForChild("GetResource").WaitForChild("ClickDetector") as ClickDetector;

button.MouseClick.Connect((p) => {
	const player = store.getState().players[serialize_userid(p.UserId)];

	if (player) {
		const resources = player.resources;
		const updated = update_hand(resources, "wheat", 5);

		store.dispatch(update<PlayerState>(serialize_userid(p.UserId), "resources", updated, "player"));
	}
});

print(makeHello("main.server.ts"));
