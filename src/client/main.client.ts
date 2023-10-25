import { makeHello } from "shared/module";
import { Players } from "@rbxts/services";
import PlayerData from "shared/PlayerData";

const test = new PlayerData(Players.LocalPlayer, "red");

print(test.resources.getResource("wood"));
print(makeHello("main.client.ts"));
