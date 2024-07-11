import Object from "@rbxts/object-utils";
import { Workspace } from "@rbxts/services";
import { store } from "server/store";
import { GET_BOARD_RESOURCES, GET_BOARD_TOKENS } from "shared/static";
import { createFolder } from "shared/utils";
import createHexagon from "./createHexagon";

export default function generateBoard(radius: number, tileSize: number): void {
	print("Starting board generation");

	createFolder("vertices", Workspace);
	createFolder("edges", Workspace);
	createFolder("hexes", Workspace);

	const newBoard = {
		hexes: {} as Record<string, Hex>,
		vertices: {} as Record<string, Vertex>,
		edges: {} as Record<string, Edge>,
	};

	const resources = GET_BOARD_RESOURCES();
	const tokens = GET_BOARD_TOKENS();
	let resourceIndex = 0;

	for (let q = -radius; q <= radius; q++) {
		const r1 = math.max(-radius, -q - radius);
		const r2 = math.min(radius, -q + radius);
		for (let r = r1; r <= r2; r++) {
			const resource = resources[resourceIndex % resources.size()];
			const token = tokens[resourceIndex % tokens.size()];
			createHexagon(newBoard, q, r, tileSize, resource, token);
			resourceIndex++;
		}
	}

	print("Finished creating hexagons and all parts");
	store.update("board", newBoard);
	print("Store updated with new board");
	print("Board generation complete");
}
