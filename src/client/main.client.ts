import { makeHello } from "shared/module";
import { Players } from "@rbxts/services";
import PlayerData from "shared/PlayerData";

const test = new PlayerData(Players.LocalPlayer, "red");
test.resources.update("wood", 4);

test.resources.update("wood", -2);
print(test.resources.get("wood"));
print(makeHello("main.client.ts"));
