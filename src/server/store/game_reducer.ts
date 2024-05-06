import { MyActions } from "shared/actions";
import { ReplicatedStorage, Players } from "@rbxts/services";
import { store } from ".";
import Object from "@rbxts/object-utils";

const remoteEvent = ReplicatedStorage.WaitForChild("UpdateClientEvent") as RemoteEvent;

export interface GameState {
	round: number;
	turn: string | number;
}

export const initGameState: GameState = {
	round: 0,
	turn: "",
};

export function game_reducer(state: GameState = initGameState, action: MyActions<GameState>): GameState {
	if (action.target === "game") {
		let newState = state;

		switch (action.type) {
			case "MERGE":
				newState = { ...state, ...(action.data as Partial<GameState>) };
				remoteEvent.FireAllClients(action);
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
				remoteEvent.FireAllClients(action);
				break;

			case "PING":
				// Check if the ID is a string before converting it to a number
				if (typeIs(action.id, "string")) {
					const numericId = tonumber(action.id);
					if (numericId !== undefined) {
						// Ensure conversion was successful
						const localPlayer = Players.GetPlayerByUserId(numericId);
						if (localPlayer) {
							remoteEvent.FireClient(localPlayer, action);
						}
					} else {
						// Handle cases where the id could not be converted to a number
						error(`Invalid user ID provided: ${action.id}`);
					}
				} else {
					// Handle cases where id might not be provided or is not a string
					error("User ID is undefined or not a string");
				}
				return state;

			default:
				return state;
		}

		return newState;
	}

	return state;
}
