import { makeHello } from "shared/module";
import { runServerTests } from "./test";

runServerTests();

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
