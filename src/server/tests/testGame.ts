import { store } from "server/store";
import { serializeUserId } from "shared/utils";

export default function testGame() {
	store.registerHandler("START_TURN", (player) => {
		if (!player) return;
		const playerId = serializeUserId(player.UserId);
		store.update("game", {
			...store.getState().game,
			currentTurn: playerId,
			diceRoll: [math.random(1, 6), math.random(1, 6)],
			gamePhase: "main",
		});
		print(`Server processed START_TURN for player: ${playerId}`);
	});

	print("game: " + store.getState().game.currentTurn);

	wait(5);

	print("game: " + store.getState().game.currentTurn);
}
