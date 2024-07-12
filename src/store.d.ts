interface Payload<T = unknown> {
	event: string;
	data: T;
}

type HandlerFunction = (player: Player | undefined, payload: unknown) => void;

// Shared state interface
interface SharedState {
	players: {
		[playerId: string]: {
			knightsPlayed: number;
			longestRoadLength: number;
			totalResources: number;
			setupRoll?: number;
		};
	};
	game: {
		turnOrder: string[]; // Array of player IDs in turn order
		currentTurnIndex: number; // Index of the current player in turnOrder
		isReversed: boolean; // Flag to indicate if turn order is reversed
		diceRoll: [number, number];
		gamePhase: "setup" | "main" | "ended";
		turnPhase: "trade" | "build";
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
