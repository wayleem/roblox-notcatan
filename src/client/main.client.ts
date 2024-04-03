import { makeHello } from "shared/module";
import { Players, UserInputService } from "@rbxts/services";
import build_mode from "./controllers/build_mode";

UserInputService.InputBegan.Connect((build_mode))

/*
 * Find a way to give both client and server access to the same Game Instance so
 * server can generate the board while client handles mouse hover logic for local
 * use spawn multithreading to check for hover when player mouse moves instead of while true
 * need to add mouse leave function too
 */
print(makeHello("main.client.ts"));
