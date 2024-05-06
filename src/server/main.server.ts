import { ServerStorage, Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import { store } from "server/store";
import Object from "@rbxts/object-utils";
import generate_board from "./game/generate_board";
import { makeHello } from "shared/module";
import { update } from "shared/actions";
import { serialize_userid, add_to_hand } from "shared/utils";
import { PlayerState } from "./store/players_reducer";
import "./events";
import "./game/connection";
import { GameState } from "client/local_store/game_reducer";

// dispatch board update
generate_board(2, 10);

// this is correct
print("server hexes: ", Object.keys(store.getState().board.hexes));

const button = Workspace.WaitForChild("GetResource").WaitForChild("ClickDetector") as ClickDetector;

button.MouseClick.Connect((p) => {
	const player = store.getState().players[serialize_userid(p.UserId)];

	if (player) {
		const resources = player.resources;
		const updated = add_to_hand(resources, "wheat", 5);

		store.dispatch(update<PlayerState>(serialize_userid(p.UserId), "resources", updated, "player"));
	}
});

print(makeHello("main.server.ts"));
