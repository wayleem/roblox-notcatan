import { Workspace } from "@rbxts/services";
import { store } from "server/store";
import Object from "@rbxts/object-utils";
import { makeHello } from "shared/module";
import { update } from "shared/actions";
import { serializeUserId, addToHand } from "shared/utils";
import "./events";
import "./game/connection";
import { PlayerState } from "./store/player_reducer";
import generateBoard from "./game/generate_board";

// dispatch board update
generateBoard(2, 10);

// this is correct
print("server hexes: ", Object.keys(store.getState().board.hexes));

const button = Workspace.WaitForChild("GetResource").WaitForChild("ClickDetector") as ClickDetector;

button.MouseClick.Connect((p) => {
	const player = store.getState().players[serializeUserId(p.UserId)];

	if (player) {
		const resources = player.resources;
		const updated = addToHand(resources, "wheat", 5);

		store.dispatch(update<PlayerState>(serializeUserId(p.UserId), "resources", updated, "player"));
	}
});

print(makeHello("main.server.ts"));
