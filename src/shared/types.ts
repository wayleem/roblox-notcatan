export type DevCard = {
	knight: number;
	year_of_plenty: number;
	monopoly: number;
	road_building: number;
	point: number;
};

export type Resource = {
	wheat: number;
	sheep: number;
	ore: number;
	wood: number;
	brick: number;
};

/*
 * Note:
 * Edges has vertices because an edge cannot exist without two vertices.
 * Vertex does not have edge reference because it is not dependent on it.
 */
export interface Node {
	id: string;
	part: Part;
}
export interface Vertex extends Node {
	position: Vector3;
	building?: Settlement | City; // Optional building
}

export interface Edge extends Node {
	cframe: CFrame;
	vertices: [Vector3, Vector3];
	road?: Road; // Optional road
}

export interface Hex extends Node {
	position: Vector3; // Center position
	vertices: Vertex[];
	edges: Edge[];
	resource: Resource;
	token?: number;
}

export interface Building {
	id: string;
	ownerId: number;
	part?: Part;
}

export interface Road extends Building {
	edge: Edge;
}

export interface Settlement extends Building {
	vertex: Vertex;
	points: 1;
}

export interface City extends Building {
	vertex: Vertex;
	points: 2;
}

export interface PlayerData {
	teamColor: string;

	resources: Resource;
	devCards: DevCard;

	roads: Road[];
	settlements: Settlement[];
	cities: City[];

	numPlayedKnights: number;
	numVictoryPoints: number;
}
