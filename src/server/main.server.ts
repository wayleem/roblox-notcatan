import { ServerStorage } from "@rbxts/services";
import { Board } from "shared/Board";
import { makeHello } from "shared/module";
// 1 = 24 vertices and 30 edges
//
export const new_game = new Board();

new_game.generateHexBoard(2, 10);

const vertices = new_game.getVertices();

vertices.forEach((v) => {
	const part = v.getPart() as Part;
	const highlight = part.WaitForChild("Highlight") as Highlight;
	const clickDetector = part.WaitForChild("ClickDetector") as ClickDetector;
	spawn(() => print("loop"));
});

print(makeHello("main.server.ts"));
