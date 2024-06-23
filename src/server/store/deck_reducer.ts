import { initDeckState } from "shared/store";

export function deckReducer(state: DeckState = initDeckState, action: MyActions<DeckState>): DeckState {
	if (action.target === "deck") {
		switch (action.type) {
			case "CREATE":
				return {
					resources: action.data.resources || state.resources,
					devCards: action.data.devCards || state.devCards,
				};
			case "MERGE":
				return {
					resources: { ...state.resources, ...action.data.resources },
					devCards: { ...state.devCards, ...action.data.devCards },
				};
			case "UPDATE_KEY":
				if (action.key in state.resources) {
					return {
						...state,
						resources: {
							...state.resources,
							[action.key]: action.value,
						},
					};
				} else if (action.key in state.devCards) {
					return {
						...state,
						devCards: {
							...state.devCards,
							[action.key]: action.value,
						},
					};
				}
				return state;
			case "DEL":
				return {
					...state,
					resources: { ...state.resources, [action.id]: 0 },
					devCards: { ...state.devCards, [action.id]: 0 },
				};
			case "PING":
				return state;
		}
	}
	return state;
}
