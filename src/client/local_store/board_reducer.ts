import { combineReducers } from "@rbxts/rodux";
import { MyActions } from "shared/actions";
import { ArrayT, Edge, Hex, Vertex } from "shared/types";

function vertexReducer(state: ArrayT<Vertex> = {}, action: MyActions<Vertex>): ArrayT<Vertex> {
	if (action.target === "vertex")
		switch (action.type) {
			case "CREATE":
				print("added client vertex:", state);
				return {
					...state,
					[action.id]: action.data,
				};

			case "MERGE":
				const currentState = state[action.id];
				if (currentState) {
					return {
						...state,
						[action.id]: {
							...currentState,
							...action.data,
						},
					};
				}
				return state;
			case "UPDATE_KEY":
				const keyToUpdate = state[action.id];
				if (keyToUpdate && action.key in keyToUpdate) {
					return {
						...state,
						[action.id]: {
							...keyToUpdate,
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
				state = action.state;
				return state;
			default:
				return state;
		}
	return state;
}

function edgeReducer(state: ArrayT<Edge> = {}, action: MyActions<Edge>): ArrayT<Edge> {
	if (action.target === "edge")
		switch (action.type) {
			case "CREATE":
				return {
					...state,
					[action.id]: action.data,
				};
			case "MERGE":
				const currentState = state[action.id];
				if (currentState) {
					return {
						...state,
						[action.id]: {
							...currentState,
							...action.data,
						},
					};
				}
				return state;
			case "UPDATE_KEY":
				const keyToUpdate = state[action.id];
				if (keyToUpdate && action.key in keyToUpdate) {
					return {
						...state,
						[action.id]: {
							...keyToUpdate,
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
				action.state = state;
				return state;
			default:
				return state;
		}
	return state;
}

function hexReducer(state: ArrayT<Hex> = {}, action: MyActions<Hex>): ArrayT<Hex> {
	if (action.target === "hex")
		switch (action.type) {
			case "CREATE":
				return {
					...state,
					[action.id]: action.data,
				};
			case "MERGE":
				const currentState = state[action.id];
				if (currentState) {
					return {
						...state,
						[action.id]: {
							...currentState,
							...action.data,
						},
					};
				}
				return state;
			case "UPDATE_KEY":
				const keyToUpdate = state[action.id];
				if (keyToUpdate && action.key in keyToUpdate) {
					return {
						...state,
						[action.id]: {
							...keyToUpdate,
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
				state = action.state;
				return state;
			default:
				return state;
		}
	return state;
}

export const boardReducer = combineReducers({
	vertices: vertexReducer,
	edges: edgeReducer,
	hexes: hexReducer,
});
