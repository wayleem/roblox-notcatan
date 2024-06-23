import { ServerStorage, Workspace } from "@rbxts/services";
import { create } from "shared/actions";
import { store } from "server/store";
import Object from "@rbxts/object-utils";
import { GET_BOARD_RESOURCES, PART_THICKNESS, VERTEX_SIZE, GET_BOARD_TOKENS } from "shared/static";
import { createFolder, isVector3Equal, serializeEdge, serializeHex, serializeVertex, someT } from "shared/utils";

export default function generateBoard(radius: number, tileSize: number): void {
	const resources = GET_BOARD_RESOURCES();
	const tokens = GET_BOARD_TOKENS();
	let resourceIndex = 0;

	for (let q = -radius; q <= radius; q++) {
		const r1 = math.max(-radius, -q - radius);
		const r2 = math.min(radius, -q + radius);
		for (let r = r1; r <= r2; r++) {
			const resource = resources[resourceIndex % resources.size()];
			const token = tokens[resourceIndex % tokens.size()];
			createHexagon(q, r, tileSize, resource, token);
			resourceIndex++;
		}
	}
	const board = store.getState().board;
	generateParts(board.vertices, board.edges, board.hexes);
}

function createHexagon(q: number, r: number, tileSize: number, resource: Resource, token: number): void {
	const board = store.getState().board;
	const vertices: ArrayT<Vertex> = board.vertices;
	const edges: ArrayT<Edge> = board.edges;

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

		const edgeCFrame = CFrame.lookAt(vertexVector.add(nextVertexVector).div(2), nextVertexVector);

		if (!someT(edges, (e) => isVector3Equal(e.cframe.Position, edgeCFrame.Position))) {
			const edge: Edge = { cframe: edgeCFrame, vertices: [vertexVector, nextVertexVector] };
			hexEdges.push(edge);
			store.dispatch(create<Edge>(serializeEdge(edge), edge, "edge"));
		}

		if (!someT(vertices, (v) => isVector3Equal(v.position, vertexVector))) {
			const vertex: Vertex = { position: vertexVector };
			hexVertices.push(vertex);
			store.dispatch(create<Vertex>(serializeVertex(vertex), vertex, "vertex"));
		}
	}

	const hex: Hex = { position: center, vertices: hexVertices, edges: hexEdges, resource, token };
	store.dispatch(create<Hex>(serializeHex(hex), hex, "hex"));
}

function generateParts(vertices: ArrayT<Vertex>, edges: ArrayT<Edge>, hexes: ArrayT<Hex>) {
	createFolder("vertices", Workspace);
	createFolder("edges", Workspace);
	createFolder("hexes", Workspace);

	Object.values(vertices).forEach((v) => {
		createVertexPart(v);
	});
	Object.values(edges).forEach((e) => {
		createEdgePart(e);
	});
	Object.values(hexes).forEach((h) => {
		createHexPart(h);
	});
}

// Additional functions for creating parts remain unchanged

function hexToWorld(q: number, r: number, tileSize: number): Vector3 {
	const x = tileSize * ((3 / 2) * q);
	const z = tileSize * (math.sqrt(3) * r + (math.sqrt(3) / 2) * q);
	return new Vector3(x, 0, z);
}
function createHexPart(hex: Hex) {
	const hexPart = ServerStorage.WaitForChild("Tile").Clone() as Part;
	const hexFolder = Workspace.WaitForChild("hexes") as Folder;

	hexPart.Name = serializeHex(hex);
	hexPart.Parent = hexFolder;
	hexPart.Position = hex.position;

	return hexPart;
}

function createEdgePart(edge: Edge): Part {
	const v1_vector = edge.vertices[0];
	const v2_vector = edge.vertices[1];
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

	return edgePart;
}

function createVertexPart(vertex: Vertex): Part {
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

	return vertexPart;
}
