import { makeHello } from "shared/module";
import "./connection";
import "./dice";
import "./inventory";
import testBoard from "./tests/testBoard";
import testCollectResource from "./tests/testCollectResource";

testCollectResource();

print(makeHello("main.server.ts"));
