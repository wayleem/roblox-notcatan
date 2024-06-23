export const initGameState: GameState = {
	round: 0,
	turn: "",
};

export const initResourceState: Resource = { wheat: 0, sheep: 0, ore: 0, wood: 0, brick: 0 };
export const initDevCardState: DevCard = { knight: 0, year_of_plenty: 0, monopoly: 0, road_building: 0, point: 0 };

export const initDeckState: DeckState = {
	resources: { ...initResourceState },
	devCards: { ...initDevCardState },
};

export const initPlayerState: PlayerState = {
	teamColor: "red",
	resources: { wheat: 0, sheep: 0, ore: 0, wood: 0, brick: 0 },
	devCards: { knight: 0, year_of_plenty: 0, monopoly: 0, road_building: 0, point: 0 },
	roads: [],
	settlements: [],
	cities: [],
	numPlayedKnights: 0,
	numVictoryPoints: 0,
};
