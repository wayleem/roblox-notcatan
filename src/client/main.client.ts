import { makeHello } from "shared/module";
import { Players } from "@rbxts/services";
import PlayerData from "shared/PlayerData";
import { new_game } from "server/main.server";

const test = new PlayerData(Players.LocalPlayer, "red");
test.getResourceHand().update("wood", 4);

test.getResourceHand().update("wood", -2);
print(test.getResourceHand().get("wood"));

const vertices = new_game.getVertices();

vertices.forEach((v) => {
	const part = v.getPart() as Part;
	const highlight = part.WaitForChild("Highlight") as Highlight;
	const clickDetector = part.WaitForChild("ClickDetector") as ClickDetector;
	spawn(() =>
		test
			.getPlayer()
			.GetMouse()
			.Move.Connect(() => highlightUI(clickDetector, highlight)),
	);
});

function highlightUI(clickDetector: ClickDetector, highlight: Highlight) {
	clickDetector.MouseHoverEnter.Connect(() => (highlight.Enabled = true));
}

/*
 * Find a way to give both client and server access to the same Game Instance so
 * server can generate the board while client handles mouse hover logic for local
 * use spawn multithreading to check for hover when player mouse moves instead of while true
 * need to add mouse leave function too
 */
print(makeHello("main.client.ts"));
