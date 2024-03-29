import { board_reducer } from "./board_store"
import { players_reducer } from "./player_store"
import { Store, combineReducers } from "@rbxts/rodux"

const root_reducer = combineReducers({
  board: board_reducer,
  players: players_reducer,
});

export const store = new Store(root_reducer)
