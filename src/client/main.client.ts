import { makeHello } from "shared/module";
import "./ui";
import testBoard from "./tests/testBoard";
import testCollectResource from "./tests/testCollectResource";

testCollectResource();

print(makeHello("main.client.ts"));
