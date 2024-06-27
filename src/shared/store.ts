export const initialBoardState: BoardState = {
	vertices: {},
	edges: {},
	hexes: {},
};

export const initialGameState: Record<"game", GameState> = {
	game: { currentTurn: "", diceRoll: 0, gamePhase: "SETUP" },
};

export const initialResources: Record<ResourceType, number> = {
	wood: 0,
	brick: 0,
	ore: 0,
	wheat: 0,
	sheep: 0,
};

export const initialDevCards: Record<DevCardType, number> = {
	knight: 0,
	monopoly: 0,
	year_of_plenty: 0,
	road_building: 0,
	point: 0,
};
