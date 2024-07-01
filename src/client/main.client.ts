import { Workspace } from "@rbxts/services";
import { makeHello } from "shared/module";
import { runClientTests } from "./test";
import { clientStore } from "./store";

print(makeHello("main.client.ts"));
