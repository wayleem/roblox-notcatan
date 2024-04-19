import { board_reducer } from "./board_reducer";
import { players_reducer } from "./players_reducer";
import { Store, combineReducers } from "@rbxts/rodux";

const root_reducer = combineReducers({
	board: board_reducer,
	players: players_reducer,
});

export const store = new Store(root_reducer);
