import { ServerStorage, Workspace } from "@rbxts/services";
import { PART_THICKNESS, VERTEX_SIZE } from "shared/static";
import { serializeEdge, serializeHex, serializeVertex } from "shared/utils";

export function createHexPart(hex: Hex): Part {
	const hexPart = ServerStorage.WaitForChild("Tile").Clone() as Part;
	const hexFolder = Workspace.WaitForChild("hexes") as Folder;

	hexPart.Name = serializeHex(hex);
	hexPart.Parent = hexFolder;
	hexPart.Position = hex.position;

	return hexPart;
}

export function createEdgePart(edge: Edge): Part {
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

	return edgePart;
}

export function createVertexPart(vertex: Vertex): Part {
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
