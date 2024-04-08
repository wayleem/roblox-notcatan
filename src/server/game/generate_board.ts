import { ServerStorage } from "@rbxts/services";
import { ArrayT, Vertex, Edge, Hex } from "shared/types";
import { create } from "shared/actions";
import { store } from "server/store";
import { someT, is_vector3_equal, serialize_vertex, serialize_edge, serialize_hex } from "shared/utils";

const PART_THICKNESS: number = 1; // Thickness of the hexagon edges
const VERTEX_SIZE: number = 2; // Size of the hexagon vertices static RADIUS: number = 2; // Size of the game board

export default function generate_board(radius: number, tileSize: number): void {
	for (let q = -radius; q <= radius; q++) {
		const r1 = math.max(-radius, -q - radius);
		const r2 = math.min(radius, -q + radius);
		for (let r = r1; r <= r2; r++) {
			create_hexagon(q, r, tileSize);
		}
	}
}

function create_hexagon(q: number, r: number, radius: number): void {
	const board = store.getState().board;
	const vertices: ArrayT<Vertex> = board.vertices;
	const edges: ArrayT<Edge> = board.edges;

	const center = hex_to_world(q, r, radius);
	const hexEdges: Edge[] = [];
	const hexVertices: Vertex[] = [];

	// Hexagon has 6 vertices / 6 edges, loop 6.
	for (let i = 0; i < 6; i++) {
		// Create two vertex positions and calculate edge cframe from that.
		const angle = (2 * math.pi * i) / 6;
		const vertexVector = new Vector3(
			center.X + radius * math.cos(angle),
			center.Y,
			center.Z + radius * math.sin(angle),
		);
		const nextAngle = (2 * math.pi * (i + 1)) / 6;
		const nextVertexVector = new Vector3(
			center.X + radius * math.cos(nextAngle),
			center.Y,
			center.Z + radius * math.sin(nextAngle),
		);

		const edgeCFrame = CFrame.lookAt(vertexVector.add(nextVertexVector).div(2), nextVertexVector);

		// Create edge from calculated cframe.
		if (!someT(edges, (e) => is_vector3_equal(e.cframe.Position, edgeCFrame.Position))) {
			const edgePart = create_edge_part(edgeCFrame, vertexVector, nextVertexVector);
			const edge: Edge = {
				cframe: edgeCFrame,
				vertices: [vertexVector, nextVertexVector],
				part: edgePart,
			};
			hexEdges.push(edge);
			store.dispatch(create<Edge>(serialize_edge(edgeCFrame), edge, "edge"));
		}
		// Create vertex from vertex position.
		if (!someT(vertices, (v) => is_vector3_equal(v.position, vertexVector))) {
			const vertexPart = create_vertex_part(vertexVector);
			const vertex: Vertex = {
				position: vertexVector,
				part: vertexPart,
			};
			hexVertices.push(vertex);
			store.dispatch(create<Vertex>(serialize_vertex(vertexVector), vertex, "vertex"));
		}
	}
	const hexPart = ServerStorage.WaitForChild("Tile").Clone() as Part;
	hexPart.Parent = game.Workspace;
	hexPart.Position = center;

	const hex: Hex = {
		position: center,
		vertices: hexVertices,
		edges: hexEdges,
		part: hexPart,
		resource: {
			wheat: 0,
			sheep: 0,
			ore: 0,
			wood: 0,
			brick: 0,
		},
	};
	store.dispatch(create<Hex>(serialize_hex(center), hex, "hex"));
}

function hex_to_world(q: number, r: number, tileSize: number): Vector3 {
	const x = tileSize * ((3 / 2) * q);
	const z = tileSize * (math.sqrt(3) * r + (math.sqrt(3) / 2) * q);
	return new Vector3(x, 0, z);
}

function create_edge_part(cframe: CFrame, v1_vector: Vector3, v2_vector: Vector3): Part {
	const edgePart = new Instance("Part");
	const highlight = new Instance("Highlight");
	const clickDetector = new Instance("ClickDetector");

	edgePart.Name = "edge";
	edgePart.Size = new Vector3(PART_THICKNESS, PART_THICKNESS, v1_vector.sub(v2_vector).Magnitude);
	edgePart.CFrame = cframe;
	edgePart.Anchored = true;

	edgePart.Parent = game.Workspace;
	highlight.Enabled = false;
	highlight.Parent = edgePart;
	clickDetector.Parent = edgePart;

	return edgePart;
}

function create_vertex_part(position: Vector3): Part {
	const vertexPart = new Instance("Part");
	const highlight = new Instance("Highlight");
	const clickDetector = new Instance("ClickDetector");

	vertexPart.Name = "vertex";
	vertexPart.Shape = Enum.PartType.Ball;
	vertexPart.Size = new Vector3(VERTEX_SIZE, VERTEX_SIZE, VERTEX_SIZE);
	vertexPart.Position = position;
	vertexPart.Anchored = true;

	vertexPart.Parent = game.Workspace;
	highlight.Enabled = false;
	highlight.Parent = vertexPart;
	clickDetector.Parent = vertexPart;

	return vertexPart;
}
