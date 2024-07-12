import { store } from "server/store";
import { serializeUserId } from "shared/utils";

store.registerHandler("REQUEST_RESOURCES", (player) => {
	if (!player) return;
	const playerId = serializeUserId(player.UserId);
	const state = store.getState();
	const resources = state.players[playerId].resources;

	store.remote("SEND_RESOURCES", resources, player);
});

store.registerHandler("REQUEST_DEVCARDS", (player) => {
	if (!player) return;
	const playerId = serializeUserId(player.UserId);
	const state = store.getState();
	const devCards = state.players[playerId].devCards;

	store.remote("SEND_DEVCARDS", devCards, player);
});
