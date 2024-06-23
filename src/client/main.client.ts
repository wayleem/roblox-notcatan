import { Workspace } from "@rbxts/services";
import { makeHello } from "shared/module";
import "./ui";
const button = Workspace.WaitForChild("GetResource").WaitForChild("ClickDetector") as ClickDetector;

button.MouseClick.Connect(() => {
	wait(1);
	print("updated client's resources: ");
});

print(makeHello("main.client.ts"));
