import { ReplicatedStorage } from "@rbxts/services";
import { MyActions } from "shared/actions";
import { DevCard, Resource, Road, Settlement, City, Edge, ArrayT } from "shared/types";
import { remote_update_client } from "shared/utils";

export interface PlayerState {
	teamColor: string;

	resources: Resource;
	devCards: DevCard;

	roads: Road[];
	settlements: Settlement[];
	cities: City[];

	numPlayedKnights: number;
	numVictoryPoints: number;
}

const remoteEvent = ReplicatedStorage.WaitForChild("UpdateClientEvent") as RemoteEvent;

export function players_reducer(state: ArrayT<PlayerState> = {}, action: MyActions<PlayerState>): ArrayT<PlayerState> {
	if (action.target === "player")
		switch (action.type) {
			case "CREATE":
				remoteEvent.FireAllClients(action);
				return {
					...state,
					[action.id]: action.data,
				};
			case "MERGE":
				remoteEvent.FireAllClients(action);
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
				remoteEvent.FireAllClients(action);
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
				remoteEvent.FireAllClients(action);
				const newState = { ...state };
				delete newState[action.id];
				return newState;
			case "PING":
				remoteEvent.FireClient(action.player, action);
				return state;
		}
	return state;
}
