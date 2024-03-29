import { ServerStorage } from "@rbxts/services";
import { store } from "shared/store";
import { makeHello } from "shared/module";
import generate_board from "./game/generate_board";
import { Vertex } from "shared/types";

generate_board(2, 10)

const board = store.getState().board;
const vertices: Vertex[] = board.vertices



vertices.forEach((v) => {
  const vertexPart = v.part

})

const remoteEvent = new Instance("RemoteEvent") as RemoteEvent;

print(makeHello("main.server.ts"));
