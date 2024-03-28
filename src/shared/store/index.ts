import { boardReducer } from "./board"
import { playersReducer } from "./player"
import { Store, combineReducers } from "@rbxts/rodux"

const rootReducer = combineReducers({
  board: boardReducer,
  players: playersReducer,
});

export const store = new Store(rootReducer)
