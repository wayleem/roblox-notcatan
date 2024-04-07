import { PlayerState } from "server/store/players_reducer";
import { MyActions } from "shared/actions";
import { ArrayT } from "shared/types";

export function players_reducer(state: ArrayT<PlayerState> = {}, action: MyActions<PlayerState>): ArrayT<PlayerState> {
	if (action.target === "player")
		switch (action.type) {
			case "CREATE":
				return {
					...state,
					[action.id]: action.data,
				};
			case "MERGE":
				const currentPlayerState = state[action.id];
				if (currentPlayerState) {
					return {
						...state,
						[action.id]: {
							...currentPlayerState,
							...action.data,
						},
					};
				}
				return state;
			case "UPDATE_KEY":
				const playerToUpdate = state[action.id];
				if (playerToUpdate && action.key in playerToUpdate) {
					return {
						...state,
						[action.id]: {
							...playerToUpdate,
							[action.key]: action.value,
						},
					};
				}
				return state;
			case "DEL":
				const newState = { ...state };
				delete newState[action.id];
				return newState;
			case "PING":
				return state;
			default:
				return state;
		}
	return state;
}
