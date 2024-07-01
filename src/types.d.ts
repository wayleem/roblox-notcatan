interface Payload<T = unknown> {
	event: string;
	data: T;
}

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

// Shared state interface
interface SharedState {
	players: {
		[playerId: string]: {
			knightsPlayed: number;
			longestRoadLength: number;
			totalResources: number;
		};
	};
	game: {
		currentTurn: string;
		diceRoll: [number, number];
		gamePhase: "setup" | "main" | "ended";
		longestRoadOwner: string;
		largestArmyOwner: string;
		robberHex: string;
	};
	board: {
		hexes: Record<string, Hex>;
		vertices: Record<string, Vertex>;
		edges: Record<string, Edge>;
	};
	buildings: {
		roads: Record<string, Road>;
		settlements: Record<string, Settlement>;
		cities: Record<string, City>;
	};
}

// Server-specific state interface
interface ServerState {
	players: {
		[playerId: string]: {
			victoryPoints: number;
			devCards: Record<DevCardType, number>;
			resources: Record<ResourceType, number>;
		};
	};
}
