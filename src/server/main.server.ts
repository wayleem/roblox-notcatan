import { makeHello } from "shared/module";
import generateBoard from "./game/generate_board";
import { store } from "./store";
import "./game/connection";
import { serializeUserId } from "shared/utils";

store.registerHandler("COLLECT_RESOURCE", (player) => {
	if (!player) return;
	const resource = "wood";
	const amount = 2;
	const playerId = serializeUserId(player.UserId);
	const playerState = store.getState().players[playerId];
	if (playerState) {
		store.update("players", {
			...store.getState().players,
			[playerId]: {
				...playerState,
				totalResources: playerState.totalResources + amount,
				resources: {
					...playerState.resources,
					[resource]: (playerState.resources[resource] || 0) + amount,
				},
			},
		});
	}
});

print(store.getState().players);

wait(5);

print(store.getState().players);

/*
// dispatch board update
generateBoard(2, 10);

// this is correct

print("server hexes: ", Object.keys(store.getState().entities.board.hexes));

const button = Workspace.WaitForChild("GetResource").WaitForChild("ClickDetector") as ClickDetector;

button.MouseClick.Connect((p) => {
	const id = serializeUserId(p.UserId);
	const player = store.getState().entities.players[id];

	if (player) {
		const resources = player.resources;
		const updated = addToHand(resources, "wheat", 5);

		update<PlayerState>(id, "resources", updated, "player");
		print(store.getState().entities.players[id].resources);
	}
});
*/
print(makeHello("main.server.ts"));
