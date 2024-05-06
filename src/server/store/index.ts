import { board_reducer } from "./board_reducer";
import { deck_reducer } from "./deck_reducer";
import { game_reducer } from "./game_reducer";
import { players_reducer } from "./players_reducer";
import { Store, combineReducers } from "@rbxts/rodux";

const root_reducer = combineReducers({
	board: board_reducer,
	players: players_reducer,
	deck: deck_reducer,
	game: game_reducer,
});

export const store = new Store(root_reducer);
