import { makeHello } from "shared/module";
import generateBoard from "./game/generate_board";
import { store } from "./store";
import "./game/connection";
import testCollectResource from "./tests/testCollectResource";

testCollectResource();

print(makeHello("main.server.ts"));
