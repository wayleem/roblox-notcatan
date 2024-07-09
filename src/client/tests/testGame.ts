import { Players } from "@rbxts/services";
import { clientStore } from "client/store";
import { serializeUserId } from "shared/utils";

export default function testGame() {
	wait(3);

	print("game: " + clientStore.getState().game.currentTurn);
	clientStore.sendToServer("START_TURN", serializeUserId(Players.LocalPlayer.UserId));

	wait(3);

	print("game: " + clientStore.getState().game.currentTurn);
}
