import { makeHello } from "shared/module";
import { Players } from "@rbxts/services";


/*
 * Find a way to give both client and server access to the same Game Instance so
 * server can generate the board while client handles mouse hover logic for local
 * use spawn multithreading to check for hover when player mouse moves instead of while true
 * need to add mouse leave function too
 */
print(makeHello("main.client.ts"));
