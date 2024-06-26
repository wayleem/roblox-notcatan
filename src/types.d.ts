interface EventPayload {
	data?: unknown[];
	event: string;
}

type DevCard = {
	knight: number;
	year_of_plenty: number;
	monopoly: number;
	road_building: number;
	point: number;
};

type Resource = {
	wheat: number;
	sheep: number;
	ore: number;
	wood: number;
	brick: number;
};

interface RootState {
	entities: {
		players: Record<string, PlayerState>;
		board: {
			vertices: Record<string, Vertex>;
			edges: Record<string, Edge>;
			hexes: Record<string, Hex>;
		};
	};
	singletons: {
		game: GameState;
		deck: DeckState;
	};
}

interface PlayerState {
	teamColor: string;

	resources: Resource;
	devCards: DevCard;

	roads: Road[];
	settlements: Settlement[];
	cities: City[];

	numPlayedKnights: number;
	numVictoryPoints: number;
}

interface GameState {
	round: number;
	turn: string | number;
}

interface DeckState {
	resources: Resource;
	devCards: DevCard;
}

interface BoardState {
	vertices: Record<string, Vertex>;
	edges: Record<string, Edge>;
	hexes: Record<string, Hex>;
}

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

interface Vertex {
	position: Vector3;
	building?: Settlement | City; // Optional building
}

interface Edge {
	cframe: CFrame;
	vertices: [Vertex, Vertex];
	road?: Road; // Optional road
}

interface Hex {
	position: Vector3; // Center position
	vertices: Vertex[];
	edges: Edge[];
	resource: Resource;
	token: number;
}

type Action_Create<T> = { id: string; data: T; type: "CREATE"; target: string };
// big data swap
type Action_Merge<T> = { id: string; data: Partial<T>; type: "MERGE"; target: string };
// change one key
type Action_Update<T> = {
	id: string;
	key: keyof T;
	value: unknown;
	type: "UPDATE_KEY";
	target: string;
};
// delete
type Action_Del = { id: string; type: "DEL"; target: string };
// force update clients
type Action_Flush<T> = { id: string; state: Record<string, T>; type: "PING"; target: string };

type MyActions<T> = Action_Create<T> | Action_Merge<T> | Action_Update<T> | Action_Del | Action_Flush<T>;
