import { initPlayerState } from "shared/store";

export function playerReducer(state: PlayerState = initPlayerState, action: MyActions<PlayerState>): PlayerState {
	if (action.target !== "player") return state;

	switch (action.type) {
		case "CREATE":
			return { ...state, ...action.data };
		case "MERGE":
			return { ...state, ...action.data };
		case "UPDATE_KEY":
			if (action.key in state) {
				return { ...state, [action.key]: action.value };
			}
			return state;
		case "DEL":
			return initPlayerState;
		case "PING":
			return { ...state };
		default:
			return state;
	}
}
