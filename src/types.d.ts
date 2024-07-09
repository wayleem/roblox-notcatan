type ResourceType = "wheat" | "sheep" | "ore" | "wood" | "brick";

type DevCardType = "knight" | "year_of_plenty" | "monopoly" | "road_building" | "point";

interface Building {
	ownerId: number;
	part?: Part;
}

interface Road extends Building {
	edge: Edge;
}

interface Settlement extends Building {
	vertex: Vertex;
	points: 1;
}

interface City extends Building {
	vertex: Vertex;
	points: 2;
}

interface Hex {
	position: Vector3;
	vertices: Vertex[];
	edges: Edge[];
	resource: Record<ResourceType, number>;
	token: number;
	part?: Part;
}

interface Edge {
	cframe: CFrame;
	vertices: [Vertex, Vertex];
	road?: Road;
	part?: Part;
}

interface Vertex {
	position: Vector3;
	building?: Settlement | City;
	part?: Part;
}
