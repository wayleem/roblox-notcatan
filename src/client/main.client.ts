import { makeHello } from "shared/module";
import { Players } from "@rbxts/services";
import PlayerData from "shared/player/PlayerData";

const test = new PlayerData(Players.LocalPlayer, "red");
test.getResources().update("wood", 4);

test.getResources().update("wood", -2);
print(test.getResources().get("wood"));

/*
 * Find a way to give both client and server access to the same Game Instance so
 * server can generate the board while client handles mouse hover logic for local
 * use spawn multithreading to check for hover when player mouse moves instead of while true
 * need to add mouse leave function too
 */
print(makeHello("main.client.ts"));
