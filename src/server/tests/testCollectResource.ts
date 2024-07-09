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
			store.update("players", {
				...store.getState().players,
				[playerId]: {
					...playerState,
					totalResources: playerState.totalResources + amount,
					resources: {
						...playerState.resources,
						[resource]: (playerState.resources[resource] || 0) + amount,
					},
				},
			});
		}
	});

	print(store.getState().players);

	wait(5);

	print(store.getState().players);
}
