import { Store, combineReducers } from "@rbxts/rodux";
import { playerReducer } from "./player_reducer";
import { gameReducer } from "./game_reducer";
import { deckReducer } from "./deck_reducer";
import { boardReducer } from "./board_reducer";

const root_reducer = combineReducers({
	board: boardReducer,
	players: playerReducer,
	deck: deckReducer,
	game: gameReducer,
});

export const store = new Store(root_reducer);
