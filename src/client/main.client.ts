import { Workspace } from "@rbxts/services";
import { makeHello } from "shared/module";
import { clientStore } from "./store";
import testCollectResource from "./tests/testCollectResource";

testCollectResource();

print(makeHello("main.client.ts"));
