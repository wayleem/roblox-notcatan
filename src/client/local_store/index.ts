import { Store, combineReducers } from "@rbxts/rodux";
import { local_board_reducer } from "./local_board_reducer";
import { player_reducer } from "./player_reducer";
import { ui_reducer } from "./ui_reducer";
import { ReplicatedStorage } from "@rbxts/services";

const remoteEvent = ReplicatedStorage.WaitForChild("UpdateClientEvent") as RemoteEvent
remoteEvent.OnClientEvent.Connect((newState) => {
  print("Received state from server: ", newState)

})

const root_reducer = combineReducers({
  board: local_board_reducer,
  player: player_reducer,
  ui: ui_reducer,
});

export const local_store = new Store(root_reducer);
