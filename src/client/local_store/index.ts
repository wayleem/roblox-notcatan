import { Store, combineReducers } from "@rbxts/rodux";
import { board_reducer } from "./board_reducer";
import { players_reducer } from "./players_reducer";
import { ui_reducer } from "./ui_reducer";

const root_reducer = combineReducers({
	board: board_reducer,
	players: players_reducer,
	ui: ui_reducer,
});

export const local_store = new Store(root_reducer);
