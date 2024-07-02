import { Players, Workspace } from "@rbxts/services";
import { makeHello } from "shared/module";
import { clientStore } from "./store";
import { serializeUserId } from "shared/utils";

wait(3);

print(clientStore.getState().players);
clientStore.sendToServer("COLLECT_RESOURCE", serializeUserId(Players.LocalPlayer.UserId));

wait(3);

print(clientStore.getState().players);

print(makeHello("main.client.ts"));
