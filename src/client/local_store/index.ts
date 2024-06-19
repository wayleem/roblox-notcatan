import { Store, combineReducers } from "@rbxts/rodux";
import { playerReducer } from "./player_reducer";
import { boardReducer } from "./board_reducer";
import { gameReducer } from "./game_reducer";

const root_reducer = combineReducers({
	board: boardReducer,
	player: playerReducer,
	game: gameReducer,
});

export const localStore = new Store(root_reducer);
