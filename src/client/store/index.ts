import { Store, combineReducers } from "@rbxts/rodux";
import { local_board_reducer } from "./local_board_store";
import { player_reducer } from './player_store';
import { ui_reducer } from './ui_store';

const root_reducer = combineReducers({
  board: local_board_reducer,
  player: player_reducer,
  ui: ui_reducer
});

export const store = new Store(root_reducer);
