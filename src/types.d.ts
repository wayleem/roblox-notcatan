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

// actions
type Action_Create<T> = { id: string; data: T; type: "CREATE"; target: string };
type Action_Merge<T> = { id: string; data: Partial<T>; type: "MERGE"; target: string };
type Action_Update<T> = {
	id: string;
	key: keyof T;
	value: unknown;
	type: "UPDATE_KEY";
	target: string;
};
type Action_Del = { id: string; type: "DEL"; target: string };
type Action_Flush<T> = { id: string; state: Record<string, T>; type: "PING"; target: string };
type MyActions<T> = Action_Create<T> | Action_Merge<T> | Action_Update<T> | Action_Del | Action_Flush<T>;

// states
interface BoardState {
	vertices: Record<string, Vertex>;
	edges: Record<string, Edge>;
	hexes: Record<string, Hex>;
}

interface PublicPlayerState {
	id: string;
	name: string;
	color: string;
	roadCount: number;
	settlementCount: number;
	cityCount: number;
	resourceCount: number; // Just the total, not individual resources
	devCardCount: number; // Just the total, not individual cards
	knightsPlayed: number;
	longestRoad: boolean;
	largestArmy: boolean;
}

interface PrivatePlayerState extends PublicPlayerState {
	resources: Resource;
	devCards: DevCard;
	victoryPoints: number;
}

interface GameState {
	currentTurn: string; // Player ID
	diceRoll: number;
	gamePhase: string; // e.g., "SETUP", "MAIN", "TRADE", etc.
}

interface DeckState {
	resources: Resource;
	devCards: DevCard;
}

// Client-only state
interface ClientState {
	localPlayerId: string;
}
// Server state
interface ServerState {
	vertices: Record<string, Vertex>;
	edges: Record<string, Edge>;
	hexes: Record<string, Hex>;
	players: Record<string, PrivatePlayerState>;
	game: Record<"game", GameState>;
	resourceDeck: Record<ResourceType, number>;
	devCardDeck: Record<DevCardType, number>;
}
