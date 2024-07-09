interface Payload<T = unknown> {
	event: string;
	data: T;
}

type HandlerFunction<AB> = (player: Player | undefined, payload: unknown) => void;

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
