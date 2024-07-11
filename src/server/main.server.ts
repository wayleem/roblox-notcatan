import { makeHello } from "shared/module";
import "./game/connection";
import "./game/dice";
import testBoard from "./tests/testBoard";

testBoard();

print(makeHello("main.server.ts"));
