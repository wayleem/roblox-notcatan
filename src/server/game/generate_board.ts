import { ServerStorage, Workspace } from "@rbxts/services";
import { ServerStore } from "shared/store";
import Object from "@rbxts/object-utils";
import { PART_THICKNESS, VERTEX_SIZE, GET_BOARD_RESOURCES, GET_BOARD_TOKENS, INITIAL_RESOURCES } from "shared/static";
import { createFolder, isVector3Equal, serializeEdge, serializeHex, serializeVertex } from "shared/utils";

export default function generateBoard(
	serverStore: ServerStore<SharedState, ServerState>,
	radius: number,
	tileSize: number,
): void {
	const resources = GET_BOARD_RESOURCES();
	const tokens = GET_BOARD_TOKENS();
	let resourceIndex = 0;

	for (let q = -radius; q <= radius; q++) {
		const r1 = math.max(-radius, -q - radius);
		const r2 = math.min(radius, -q + radius);
		for (let r = r1; r <= r2; r++) {
			const resource = resources[resourceIndex % resources.size()];
			const token = tokens[resourceIndex % tokens.size()];
			createHexagon(serverStore, q, r, tileSize, resource, token);
			resourceIndex++;
		}
	}
	const board = serverStore.getState().board;
	generateParts(serverStore, board.vertices, board.edges, board.hexes);
}

function createHexagon(
	serverStore: ServerStore<SharedState, ServerState>,
	q: number,
	r: number,
	tileSize: number,
	resource: ResourceType,
	token: number,
): void {
	const board = serverStore.getState().board;
	const vertices: Record<string, Vertex> = board.vertices;
	const edges: Record<string, Edge> = board.edges;

	const center = hexToWorld(q, r, tileSize);
	const hexEdges: Edge[] = [];
	const hexVertices: Vertex[] = [];

	for (let i = 0; i < 6; i++) {
		const angle = (2 * math.pi * i) / 6;
		const vertexVector = new Vector3(
			center.X + tileSize * math.cos(angle),
			center.Y,
			center.Z + tileSize * math.sin(angle),
		);
		const nextAngle = (2 * math.pi * (i + 1)) / 6;
		const nextVertexVector = new Vector3(
			center.X + tileSize * math.cos(nextAngle),
			center.Y,
			center.Z + tileSize * math.sin(nextAngle),
		);

		let vertex = Object.values(vertices).find((v) => isVector3Equal(v.position, vertexVector));
		if (!vertex) {
			vertex = { position: vertexVector };
			const id = serializeVertex(vertex);
			hexVertices.push(vertex);
			serverStore.update("board", {
				...serverStore.getState().board,
				vertices: { ...serverStore.getState().board.vertices, [id]: vertex },
			});
		}

		let nextVertex = Object.values(vertices).find((v) => isVector3Equal(v.position, nextVertexVector));
		if (!nextVertex) {
			nextVertex = { position: nextVertexVector };
			const id = serializeVertex(nextVertex);
			hexVertices.push(nextVertex);
			serverStore.update("board", {
				...serverStore.getState().board,
				vertices: { ...serverStore.getState().board.vertices, [id]: nextVertex },
			});
		}

		const edgeCFrame = CFrame.lookAt(vertexVector.add(nextVertexVector).div(2), nextVertexVector);

		if (!Object.values(edges).find((e) => isVector3Equal(e.cframe.Position, edgeCFrame.Position))) {
			const edge: Edge = { cframe: edgeCFrame, vertices: [vertex, nextVertex] };
			const id = serializeEdge(edge);
			hexEdges.push(edge);
			serverStore.update("board", {
				...serverStore.getState().board,
				edges: { ...serverStore.getState().board.edges, [id]: edge },
			});
		}
	}

	const hex: Hex = {
		position: center,
		vertices: hexVertices,
		edges: hexEdges,
		resource: { ...INITIAL_RESOURCES, [resource]: 1 },
		token,
	};
	const id = serializeHex(hex);
	serverStore.update("board", {
		...serverStore.getState().board,
		hexes: { ...serverStore.getState().board.hexes, [id]: hex },
	});
}

function generateParts(
	serverStore: ServerStore<SharedState, ServerState>,
	vertices: Record<string, Vertex>,
	edges: Record<string, Edge>,
	hexes: Record<string, Hex>,
) {
	createFolder("vertices", Workspace);
	createFolder("edges", Workspace);
	createFolder("hexes", Workspace);

	Object.values(vertices).forEach((v) => {
		createVertexPart(serverStore, v);
	});
	Object.values(edges).forEach((e) => {
		createEdgePart(serverStore, e);
	});
	Object.values(hexes).forEach((h) => {
		createHexPart(serverStore, h);
	});
}

function hexToWorld(q: number, r: number, tileSize: number): Vector3 {
	const x = tileSize * ((3 / 2) * q);
	const z = tileSize * (math.sqrt(3) * r + (math.sqrt(3) / 2) * q);
	return new Vector3(x, 0, z);
}

function createHexPart(serverStore: ServerStore<SharedState, ServerState>, hex: Hex) {
	const hexPart = ServerStorage.WaitForChild("Tile").Clone() as Part;
	const hexFolder = Workspace.WaitForChild("hexes") as Folder;

	hexPart.Name = serializeHex(hex);
	hexPart.Parent = hexFolder;
	hexPart.Position = hex.position;

	const id = serializeHex(hex);
	serverStore.update("board", {
		...serverStore.getState().board,
		hexes: {
			...serverStore.getState().board.hexes,
			[id]: { ...serverStore.getState().board.hexes[id], part: hexPart },
		},
	});

	return hexPart;
}

function createEdgePart(serverStore: ServerStore<SharedState, ServerState>, edge: Edge): Part {
	const v1_vector = edge.vertices[0].position;
	const v2_vector = edge.vertices[1].position;
	const edgePart = new Instance("Part");
	const highlight = new Instance("Highlight");
	const clickDetector = new Instance("ClickDetector");
	const edgeFolder = Workspace.WaitForChild("edges") as Folder;

	edgePart.Name = serializeEdge(edge);
	edgePart.Size = new Vector3(PART_THICKNESS, PART_THICKNESS, v1_vector.sub(v2_vector).Magnitude);
	edgePart.CFrame = edge.cframe;
	edgePart.Anchored = true;

	edgeFolder.Parent = Workspace;
	edgePart.Parent = edgeFolder;
	highlight.Enabled = false;
	highlight.Parent = edgePart;
	clickDetector.Parent = edgePart;

	const id = serializeEdge(edge);
	serverStore.update("board", {
		...serverStore.getState().board,
		edges: {
			...serverStore.getState().board.edges,
			[id]: { ...serverStore.getState().board.edges[id], part: edgePart },
		},
	});

	return edgePart;
}

function createVertexPart(serverStore: ServerStore<SharedState, ServerState>, vertex: Vertex): Part {
	const vertexPart = new Instance("Part");
	const highlight = new Instance("Highlight");
	const clickDetector = new Instance("ClickDetector");
	const vertexFolder = Workspace.WaitForChild("vertices") as Folder;

	vertexPart.Name = serializeVertex(vertex);
	vertexPart.Shape = Enum.PartType.Ball;
	vertexPart.Size = new Vector3(VERTEX_SIZE, VERTEX_SIZE, VERTEX_SIZE);
	vertexPart.Position = vertex.position;
	vertexPart.Anchored = true;

	vertexFolder.Parent = Workspace;
	vertexPart.Parent = vertexFolder;
	highlight.Enabled = false;
	highlight.Parent = vertexPart;
	clickDetector.Parent = vertexPart;

	const id = serializeVertex(vertex);
	serverStore.update("board", {
		...serverStore.getState().board,
		vertices: {
			...serverStore.getState().board.vertices,
			[id]: { ...serverStore.getState().board.vertices[id], part: vertexPart },
		},
	});

	return vertexPart;
}
