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
	vertices: ArrayT<Vertex>;
	edges: ArrayT<Edge>;
	hexes: ArrayT<Hex>;
}
