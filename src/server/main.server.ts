import { ServerStorage } from "@rbxts/services";
import { store } from "shared/store";
import { makeHello } from "shared/module";
import generate_board from "./game/generate_board";
import { Vertex } from "shared/types";

generate_board(2, 10)

const board = store.getState().board;

board.vertices.forEach((v) => {
  print(v.id)
})

board.edges.forEach((e) => {
  print(e.id)
})

board.hexes.forEach((h) => {
  print(h.id)
})

const remoteEvent = new Instance("RemoteEvent") as RemoteEvent;

print(makeHello("main.server.ts"));
