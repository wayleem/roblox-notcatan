import { ServerStorage } from "@rbxts/services";
import { makeHello } from "shared/module";
import generateBoard from "shared/core/generateBoard";

generateBoard(2, 10)

const remoteEvent = new Instance("RemoteEvent") as RemoteEvent;

print(makeHello("main.server.ts"));
