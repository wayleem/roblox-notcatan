export function createGenericReducer<T>(initialState: T) {
	return function genericReducer(state: T = initialState, action: MyActions<T>): T {
		switch (action.type) {
			case "CREATE":
				if (typeof state === "object" && state !== null) {
					return {
						...state,
						[action.id]: action.data,
					} as T;
				}
				return state;

			case "MERGE":
				if (typeof state === "object" && state !== null) {
					if (action.id in state) {
						return {
							...state,
							[action.id]: {
								...(state as any)[action.id],
								...action.data,
							},
						} as T;
					}
					return {
						...state,
						...action.data,
					} as T;
				}
				return state;

			case "UPDATE_KEY":
				if (typeof state === "object" && state !== null) {
					if (action.id in state) {
						return {
							...state,
							[action.id]: {
								...(state as any)[action.id],
								[action.key]: action.value,
							},
						} as T;
					}
					return {
						...state,
						[action.key]: action.value,
					} as T;
				}
				return state;

			case "DEL":
				if (typeof state === "object" && state !== null && action.id in state) {
					const newState = { ...state };
					delete (newState as any)[action.id];
					return newState;
				}
				return state;

			case "PING":
				return action.state as T;

			default:
				return state;
		}
	};
}
