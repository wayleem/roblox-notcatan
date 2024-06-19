import { MyActions } from "shared/actions";

export interface GameState {
	round: number;
}

export const initGameState: GameState = {
	round: 0,
};

export function gameReducer(state: GameState = initGameState, action: MyActions<GameState>): GameState {
	if (action.target === "game") {
		let newState = state;

		switch (action.type) {
			case "MERGE":
				newState = { ...state, ...(action.data as Partial<GameState>) };
				break;

			case "UPDATE_KEY":
				if (action.key in state && typeIs(action.value, "number")) {
					return {
						...state,
						[action.key]: action.value,
					};
				}
				return state;

			case "DEL":
				newState = { ...initGameState };
				break;

			case "PING":
				return state;

			default:
				return state;
		}

		return newState;
	}

	return state;
}
