import { makeHello } from "shared/utils";
import { Players, UserInputService } from "@rbxts/services";
import build_mode from "./controllers/build_mode";
import { store } from "client/store";
import { add_road } from "shared/actions/game_actions";
import Object from "@rbxts/object-utils";

UserInputService.InputBegan.Connect(build_mode);
const board = store.getState().board;

print("contents of board: ", board);

/*
Object.keys(board.vertices)
Object.values(board.vertices)
*/

/*
 * Find a way to give both client and server access to the same Game Instance so
 * server can generate the board while client handles mouse hover logic for local
 * use spawn multithreading to check for hover when player mouse moves instead of while true
 * need to add mouse leave function too
 */

print(makeHello("main.client.ts"));
