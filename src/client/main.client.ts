import { Players, ReplicatedStorage, UserInputService } from "@rbxts/services";
import build_mode from "./controllers/build_mode";
import { local_store } from "client/local_store";
import Object from "@rbxts/object-utils";
import { makeHello } from "shared/module";
import { MyActions, merge } from "shared/actions";

const remoteEvent = ReplicatedStorage.WaitForChild("UpdateClientEvent") as RemoteEvent
remoteEvent.OnClientEvent.Connect((action) => {
  print("Received state from server: ", action)
  local_store.dispatch(action)
})

UserInputService.InputBegan.Connect(build_mode);
const board = local_store.getState().board;

//print("contents of board: ", board);

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
