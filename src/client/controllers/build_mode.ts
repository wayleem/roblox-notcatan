import { Players, Workspace } from "@rbxts/services";
import { localStore } from "../local_store";
import Object from "@rbxts/object-utils";
import { isVector3Equal, serializeEdge, serializeVertex } from "shared/utils";

export default function build_mode(status: boolean) {
	const localPlayer = Players.LocalPlayer;
	const board = localStore.getState().board;
	const vertices = board.vertices;
	const edges = board.edges;

	const [openVertexIds, openEdgeIds] = getBuildable(localPlayer.UserId, vertices, edges);

	// Retrieve vertex and edge parts using serialized identifiers
	const verticesFolder = Workspace.WaitForChild("vertices") as Folder;
	const edgesFolder = Workspace.WaitForChild("edges") as Folder;

	openVertexIds.forEach((vertexId) => {
		const vertexPart = verticesFolder.FindFirstChild(vertexId) as Part;
		const highlight = vertexPart?.FindFirstChildOfClass("Highlight");
		if (highlight) {
			highlight.Enabled = status;
		} else {
			error("Highlight not found on vertex part: " + vertexId);
		}
	});

	openEdgeIds.forEach((edgeId) => {
		const edgePart = edgesFolder.FindFirstChild(edgeId) as Part;
		const highlight = edgePart?.FindFirstChildOfClass("Highlight");
		if (highlight) {
			highlight.Enabled = status;
		} else {
			error("Highlight not found on edge part: " + edgeId);
		}
	});
}

function getBuildable(playerId: number, vertices: ArrayT<Vertex>, edges: ArrayT<Edge>): [string[], string[]] {
	const openVertexIds: string[] = [];
	const openEdgeIds: string[] = [];

	// Find buildable vertices
	Object.keys(vertices).forEach((vertexId) => {
		const vertex = vertices[vertexId];
		if (vertex && isBuildableVertex(vertex, vertices, edges)) {
			openVertexIds.push(serializeVertex(vertex));
		}
	});

	// Find buildable edges
	Object.keys(edges).forEach((edgeId) => {
		const edge = edges[edgeId];
		if (edge && isBuildableEdge(edge, playerId, edges)) {
			openEdgeIds.push(serializeEdge(edge));
		}
	});

	return [openVertexIds, openEdgeIds];
}

function isBuildableVertex(vertex: Vertex, vertices: ArrayT<Vertex>, edges: ArrayT<Edge>): boolean {
	// Check if the vertex has a building
	if (vertex.building) {
		return false;
	}

	// Get the edges connected to the vertex
	const connectedEdges = Object.values(edges).filter((edge) =>
		edge.vertices.some((vec) => isVector3Equal(vec, vertex.position)),
	);

	// Check if all connected edges have no buildings on their other vertices
	return connectedEdges.every((edge) =>
		edge.vertices.every(
			(vec) =>
				!isVector3Equal(vec, vertex.position) &&
				!Object.values(vertices).some((v) => isVector3Equal(v.position, vec) && !!v.building),
		),
	);
}

function isBuildableEdge(edge: Edge, playerId: number, edges: ArrayT<Edge>): boolean {
	// Check if the edge already has a road owned by the player
	if (edge.road && edge.road.ownerId === playerId) {
		return true;
	}

	// Check if any of the edge's vertices are connected to a road owned by the player
	return edge.vertices.some((vec) =>
		Object.values(edges).some(
			(e) => e.road && e.road.ownerId === playerId && e.vertices.some((v) => isVector3Equal(v, vec)),
		),
	);
}
