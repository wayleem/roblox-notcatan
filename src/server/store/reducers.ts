import { combineReducers } from "@rbxts/rodux";
import { initDeckState, initGameState } from "shared/store";

function createEntityReducer<T extends object>(entityType: string) {
	return (state: Record<string, T> = {}, action: MyActions<T>): Record<string, T> => {
		if (action.target === entityType) {
			switch (action.type) {
				case "CREATE":
					return { ...state, [action.id]: action.data };
				case "MERGE":
					return state[action.id]
						? { ...state, [action.id]: { ...state[action.id], ...action.data } }
						: state;
				case "UPDATE_KEY":
					return state[action.id] && action.key in state[action.id]
						? { ...state, [action.id]: { ...state[action.id], [action.key]: action.value } }
						: state;
				case "DEL":
					const newState = { ...state };
					delete newState[action.id];
					return newState;
				case "PING":
					return state;
			}
		}
		return state;
	};
}

function createSingletonReducer<T extends object>(initialState: T, target: string) {
	return (state: T = initialState, action: MyActions<T>): T => {
		if (action.target === target) {
			switch (action.type) {
				case "MERGE":
					return { ...state, ...(action.data as Partial<T>) };
				case "UPDATE_KEY":
					return action.key in state ? { ...state, [action.key]: action.value } : state;
				case "DEL":
					return { ...initialState };
				case "PING":
					return state;
			}
		}
		return state;
	};
}

const boardReducer = combineReducers({
	vertices: createEntityReducer<Vertex>("vertex"),
	edges: createEntityReducer<Edge>("edge"),
	hexes: createEntityReducer<Hex>("hex"),
});

export const entitiesReducer = combineReducers({
	players: createEntityReducer<PlayerState>("player"),
	board: boardReducer,
});

export const singletonsReducer = combineReducers({
	game: createSingletonReducer<GameState>(initGameState, "game"),
	deck: createSingletonReducer<DeckState>(initDeckState, "deck"),
});
