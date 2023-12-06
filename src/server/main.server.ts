import { ServerStorage } from "@rbxts/services";
import { Board } from "shared/graph/Board";
import { makeHello } from "shared/module";
// 1 = 24 vertices and 30 edges
//
export const new_game = new Board();

new_game.generateHexBoard(2, 10);

const remoteEvent = new Instance("RemoteEvent") as RemoteEvent;

print(makeHello("main.server.ts"));
