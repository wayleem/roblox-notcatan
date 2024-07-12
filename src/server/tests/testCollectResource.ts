import { store } from "server/store";
import { serializeUserId } from "shared/utils";

export default function testCollectResource() {
	store.registerHandler("COLLECT_RESOURCE", (player) => {
		if (!player) return;
		const resource = "wood";
		const amount = 2;
		const playerId = serializeUserId(player.UserId);
		const playerState = store.getState().players[playerId];

		if (playerState) {
			const updatedPlayerState = {
				...playerState,
				totalResources: playerState.totalResources + amount,
				resources: {
					...playerState.resources,
					[resource]: (playerState.resources[resource] || 0) + amount,
				},
			};

			store.update("players", {
				...store.getState().players,
				[playerId]: updatedPlayerState,
			});

			// Send the updated resources to the client
			store.remote("SEND_RESOURCES", { resources: updatedPlayerState.resources }, player);
		}
	});

	wait(5);

	print("updated resources");

	print(store.getState().players);
	wait(5);
	print(store.getState().players);
}
