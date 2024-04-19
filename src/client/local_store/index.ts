import { Store, combineReducers } from "@rbxts/rodux";
import { board_reducer } from "./board_reducer";
import { player_reducer } from "./player_reducer";
import { ui_reducer } from "./ui_reducer";

const root_reducer = combineReducers({
	board: board_reducer,
	player: player_reducer,
	ui: ui_reducer,
});

export const local_store = new Store(root_reducer);
