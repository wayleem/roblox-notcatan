import { Players, ReplicatedStorage } from "@rbxts/services";
import { deserializeUserId } from "shared/utils";

const remoteEvent = ReplicatedStorage.WaitForChild("UpdateClientEvent") as RemoteEvent;

export function playerReducer(state: ArrayT<PlayerState> = {}, action: MyActions<PlayerState>): ArrayT<PlayerState> {
	if (action.target === "player") {
		const localPlayer = Players.GetPlayerByUserId(deserializeUserId(action.id));
		switch (action.type) {
			case "CREATE":
				if (localPlayer) remoteEvent.FireClient(localPlayer, action);
				return {
					...state,
					[action.id]: action.data,
				};
			case "MERGE":
				if (localPlayer) remoteEvent.FireClient(localPlayer, action);
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
				if (localPlayer) remoteEvent.FireClient(localPlayer, action);
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
				if (localPlayer) remoteEvent.FireClient(localPlayer, action);
				const newState = { ...state };
				delete newState[action.id];
				return newState;
			case "PING":
				if (localPlayer) remoteEvent.FireClient(localPlayer, action);
				return state;
		}
	}
	return state;
}
