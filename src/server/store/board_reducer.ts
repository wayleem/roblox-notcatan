import { combineReducers } from "@rbxts/rodux";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { deserializeUserId } from "shared/utils";

const updateClientEvent = ReplicatedStorage.WaitForChild("UpdateClientEvent") as RemoteEvent;

export interface BoardState {
	vertices: ArrayT<Vertex>;
	edges: ArrayT<Edge>;
	hexes: ArrayT<Hex>;
}

function vertexReducer(state: ArrayT<Vertex> = {}, action: MyActions<Vertex>): ArrayT<Vertex> {
	if (action.target === "vertex")
		switch (action.type) {
			case "CREATE":
				updateClientEvent.FireAllClients(action);
				return {
					...state,
					[action.id]: action.data,
				};

			case "MERGE":
				updateClientEvent.FireAllClients(action);
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
				updateClientEvent.FireAllClients(action);
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
				updateClientEvent.FireAllClients(action);
				const newState = { ...state };
				delete newState[action.id];
				return newState;
			case "PING":
				const localPlayer = Players.GetPlayerByUserId(deserializeUserId(action.id));
				if (localPlayer) updateClientEvent.FireClient(localPlayer, action);
				return state;
		}
	return state;
}

function edgeReducer(state: ArrayT<Edge> = {}, action: MyActions<Edge>): ArrayT<Edge> {
	if (action.target === "edge")
		switch (action.type) {
			case "CREATE":
				updateClientEvent.FireAllClients(action);
				return {
					...state,
					[action.id]: action.data,
				};
			case "MERGE":
				updateClientEvent.FireAllClients(action);
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
				updateClientEvent.FireAllClients(action);
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
				updateClientEvent.FireAllClients(action);
				const newState = { ...state };
				delete newState[action.id];
				return newState;
			case "PING":
				const localPlayer = Players.GetPlayerByUserId(deserializeUserId(action.id));
				if (localPlayer) updateClientEvent.FireClient(localPlayer, action);
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
				const localPlayer = Players.GetPlayerByUserId(deserializeUserId(action.id));
				if (localPlayer) updateClientEvent.FireClient(localPlayer, action);
				return state;
		}
	return state;
}

export const boardReducer = combineReducers({
	vertices: vertexReducer,
	edges: edgeReducer,
	hexes: hexReducer,
});
