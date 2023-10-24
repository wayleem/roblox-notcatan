import { makeHello } from "shared/module";
import { Players } from "@rbxts/services";
import { Resource } from "shared/Resource";
import PlayerData from "shared/PlayerData";

const test = new PlayerData(Players.LocalPlayer, "red");

print(test.resources.get(Resource.WOOD));
print(makeHello("main.client.ts"));
