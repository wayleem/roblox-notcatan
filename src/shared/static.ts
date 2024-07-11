import { shuffle } from "./utils";

export const PART_THICKNESS: number = 1;
export const VERTEX_SIZE: number = 2;

export const DEV_CARD_COST: Record<ResourceType, number> = {
	wheat: 1,
	sheep: 1,
	ore: 1,
	wood: 0,
	brick: 0,
};

export const ROAD_COST: Record<ResourceType, number> = {
	wheat: 0,
	sheep: 0,
	ore: 0,
	wood: 1,
	brick: 1,
};

export const SETTLEMENT_COST: Record<ResourceType, number> = {
	wheat: 1,
	sheep: 1,
	ore: 0,
	wood: 1,
	brick: 1,
};

export const CITY_COST: Record<ResourceType, number> = {
	wheat: 2,
	sheep: 0,
	ore: 3,
	wood: 0,
	brick: 0,
};

export function GET_BOARD_RESOURCES(): ResourceType[] {
	const resources: ResourceType[] = [];

	// Add 4 of each main resource
	for (let i = 0; i < 4; i++) {
		resources.push("wheat", "sheep", "wood");
	}

	// Add 3 ore and 3 brick
	for (let i = 0; i < 3; i++) {
		resources.push("ore", "brick");
	}

	// Add one of each to make the total 19
	resources.push("wheat", "sheep", "ore", "wood", "brick");

	return shuffle(resources);
}
export function GET_BOARD_TOKENS(): number[] {
	let tokens = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
	shuffle(tokens);
	const highValueTokens = [6, 8];
	let lastHighValueIndex = -2;

	return tokens.map((token, index) => {
		if (highValueTokens.includes(token) && math.abs(lastHighValueIndex - index) <= 1) {
			for (let j = index + 1; j < tokens.size(); j++) {
				if (!highValueTokens.includes(tokens[j])) {
					[tokens[index], tokens[j]] = [tokens[j], tokens[index]];
					break;
				}
			}
		}
		if (highValueTokens.includes(token)) {
			lastHighValueIndex = index;
		}
		return token;
	});
}

export const INITIAL_RESOURCES: Record<ResourceType, number> = {
	wood: 0,
	brick: 0,
	ore: 0,
	wheat: 0,
	sheep: 0,
};

export const INITIAL_DEV_CARDS: Record<DevCardType, number> = {
	knight: 0,
	monopoly: 0,
	year_of_plenty: 0,
	road_building: 0,
	point: 0,
};

export const INITIAL_SHAREDSTATE: SharedState = {
	players: {},
	game: {
		turnOrder: [],
		currentTurnIndex: 0,
		isReversed: false,
		diceRoll: [0, 0],
		gamePhase: "setup",
		turnPhase: "trade",
		longestRoadOwner: "",
		largestArmyOwner: "",
		robberHex: "",
	},
	board: {
		hexes: {},
		vertices: {},
		edges: {},
	},
	buildings: {
		roads: {},
		settlements: {},
		cities: {},
	},
};

export const INITIAL_SERVERSTATE: ServerState = {
	players: {},
};
