import { Players } from "@rbxts/services";
import { clientStore } from "client/store";
import { serializeUserId } from "shared/utils";

export default function testCollectResource() {
	wait(3);

	print(clientStore.getState().players);
	clientStore.remote("COLLECT_RESOURCE", serializeUserId(Players.LocalPlayer.UserId));

	wait(3);

	print(clientStore.getState().players);
}
