import Object from "@rbxts/object-utils";
import { isVector3Equal, serializeEdge, serializeHex, serializeVertex } from "shared/utils";
import { INITIAL_RESOURCES } from "shared/static";
import { createEdgePart, createVertexPart, createHexPart } from "./createRobloxPart";

export default function createHexagon(
	newBoard: { hexes: Record<string, Hex>; vertices: Record<string, Vertex>; edges: Record<string, Edge> },
	q: number,
	r: number,
	tileSize: number,
	resource: ResourceType,
	token: number,
): void {
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

		let vertex = Object.values(newBoard.vertices).find((v) => isVector3Equal(v.position, vertexVector));
		if (!vertex) {
			const part = createVertexPart({ position: vertexVector } as Vertex);
			vertex = { position: vertexVector, part };
			const id = serializeVertex(vertex);
			hexVertices.push(vertex);
			newBoard.vertices[id] = vertex;
		}

		let nextVertex = Object.values(newBoard.vertices).find((v) => isVector3Equal(v.position, nextVertexVector));
		if (!nextVertex) {
			const part = createVertexPart({ position: nextVertexVector } as Vertex);
			nextVertex = { position: nextVertexVector, part };
			const id = serializeVertex(nextVertex);
			hexVertices.push(nextVertex);
			newBoard.vertices[id] = nextVertex;
		}

		const edgeCFrame = CFrame.lookAt(vertexVector.add(nextVertexVector).div(2), nextVertexVector);
		if (!Object.values(newBoard.edges).find((e) => isVector3Equal(e.cframe.Position, edgeCFrame.Position))) {
			const edge: Edge = {
				cframe: edgeCFrame,
				vertices: [vertex, nextVertex],
				part: createEdgePart({ cframe: edgeCFrame, vertices: [vertex, nextVertex] } as Edge),
			};
			const id = serializeEdge(edge);
			hexEdges.push(edge);
			newBoard.edges[id] = edge;
		}
	}

	const hex: Hex = {
		position: center,
		vertices: hexVertices,
		edges: hexEdges,
		resource: { ...INITIAL_RESOURCES, [resource]: 1 },
		token,
		part: createHexPart({
			position: center,
			vertices: hexVertices,
			edges: hexEdges,
			resource: { ...INITIAL_RESOURCES, [resource]: 1 },
			token,
		} as Hex),
	};
	const id = serializeHex(hex);
	newBoard.hexes[id] = hex;
}

function hexToWorld(q: number, r: number, tileSize: number): Vector3 {
	const x = tileSize * ((3 / 2) * q);
	const z = tileSize * (math.sqrt(3) * r + (math.sqrt(3) / 2) * q);
	return new Vector3(x, 0, z);
}
