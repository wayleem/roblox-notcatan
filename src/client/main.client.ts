import { Workspace } from "@rbxts/services";
import { makeHello } from "shared/module";
import { runClientTests } from "./test";

runClientTests();

print(makeHello("main.client.ts"));
