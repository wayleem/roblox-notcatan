import { shuffle } from "./utils";

export const PART_THICKNESS: number = 1;
export const VERTEX_SIZE: number = 2;
/*

export const DEV_CARD_COST: Resource = {
	wheat: -1,
	sheep: -1,
	ore: -1,
	wood: 0,
	brick: 0,
};

export const ROAD_COST: Resource = {
	wheat: 0,
	sheep: 0,
	ore: 0,
	wood: -1,
	brick: -1,
};

export const SETTLEMENT_COST: Resource = {
	wheat: -1,
	sheep: -1,
	ore: 0,
	wood: -1,
	brick: -1,
};

export const CITY_COST: Resource = {
	wheat: -2,
	sheep: 0,
	ore: -3,
	wood: 0,
	brick: 0,
};

export function GET_BOARD_RESOURCES(): Resource[] {
	const resources: Resource[] = [];
	for (let i = 0; i < 4; i++) {
		// 4 wheat, 4 sheep, 4 wood
		resources.push(
			{ wheat: 1, sheep: 0, ore: 0, wood: 0, brick: 0 },
			{ wheat: 0, sheep: 1, ore: 0, wood: 0, brick: 0 },
			{ wheat: 0, sheep: 0, ore: 0, wood: 1, brick: 0 },
		);
		// 3 ore, 3 brick
		if (i < 3) {
			resources.push(
				{ wheat: 0, sheep: 0, ore: 3, wood: 0, brick: 0 },
				{ wheat: 0, sheep: 0, ore: 0, wood: 0, brick: 3 },
			);
		}
		// 1 desert
		if (i < 1) {
			resources.push({ wheat: 0, sheep: 0, ore: 0, wood: 0, brick: 0 });
		}
	}

	shuffle(resources);
	return resources;
}

export function GET_BOARD_TOKENS(): number[] {
	let tokens = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
	shuffle(tokens);

	const highValueTokens = [6, 8];
	let lastHighValueIndex = -2; // Track the last index of high-value tokens

	tokens = tokens.map((token, index) => {
		if (highValueTokens.includes(token) && math.abs(lastHighValueIndex - index) <= 1) {
			// Find a non-high-value position to swap with
			for (let j = index + 1; j < tokens.size(); j++) {
				if (!highValueTokens.includes(tokens[j])) {
					[tokens[index], tokens[j]] = [tokens[j], tokens[index]]; // Swap
					break;
				}
			}
		}
		if (highValueTokens.includes(token)) {
			lastHighValueIndex = index;
		}
		return token;
	});

	return tokens;
}

export const initialBoardState: BoardState = {
	vertices: {},
	edges: {},
	hexes: {},
};

export const initialGameState: Record<"game", GameState> = {
	game: { currentTurn: "", diceRoll: 0, gamePhase: "SETUP" },
};

*/
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
