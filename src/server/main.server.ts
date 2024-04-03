import { ServerStorage } from "@rbxts/services";
import { store } from "shared/store";
import { makeHello } from "shared/module";
import generate_board from "./game/generate_board";
import { Vertex } from "shared/types";

generate_board(2, 10);

const board = store.getState().board;

board.vertices.forEach((v) => {
	print(v.id);
});

board.edges.forEach((e) => {
	print(e.id);
	if (e.id === "edge:(15,0,-0)") {
		e.part.Color = new Color3(1, 0, 0);
		print("edge test success");
	}
});

board.hexes.forEach((h) => {
	print(h.id);
	if (h.id === "hex:-15:0:-25.98") {
		// cant change color of unions so we use destroy for visible change
		h.part.Destroy();
		print("test success");
	}
});

const remoteEvent = new Instance("RemoteEvent") as RemoteEvent;

print(makeHello("main.server.ts"));
