/*
 * Note:
 * Edges has vertices because an edge cannot exist without two vertices.
 * Vertex does not have edge reference because it is not dependent on it.
 */
interface Vertex {
	position: Vector3;
	building?: Settlement | City; // Optional building
}

interface Edge {
	cframe: CFrame;
	vertices: [Vector3, Vector3];
	road?: Road; // Optional road
}

interface Hex {
	position: Vector3; // Center position
	vertices: Vertex[];
	edges: Edge[];
	resource: Resource;
	token: number;
}
