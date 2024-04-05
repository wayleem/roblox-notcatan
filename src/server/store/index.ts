import { board_reducer } from "./board_reducer";
import { game_reducer } from "./game_reducer";
import { Store, combineReducers } from "@rbxts/rodux";

const root_reducer = combineReducers({
  board: board_reducer,
  game: game_reducer,
});

export const store = new Store(root_reducer);
