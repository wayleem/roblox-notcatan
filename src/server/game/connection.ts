import { create, del, flush } from "shared/actions";
import { store } from "server/store";
import { Players } from "@rbxts/services";
import Object from "@rbxts/object-utils";
import { serializeUserId } from "shared/utils";
import { clients } from "server/events";
import { initPlayerState } from "shared/store";

Players.PlayerAdded.Connect((player) => {
	print("player joined:", player.Name);
	onPlayerJoin(player);

	const allPlayerIds = Object.keys(store.getState().players);

	print("Current player IDs in the store:", allPlayerIds);
});

Players.PlayerRemoving.Connect((player) => {
	print("Player leaving:", player.Name);
	onPlayerLeave(player);

	const allPlayerIds = Object.keys(store.getState().players);

	print("Current player IDs in the store:", allPlayerIds);
});

function onPlayerJoin(player: Player) {
	const playerId = serializeUserId(player.UserId);

	clients.FireClient(player, flush(playerId, store.getState().board.vertices, "vertex"));
	clients.FireClient(player, flush(playerId, store.getState().board.edges, "edges"));
	clients.FireClient(player, flush(playerId, store.getState().board.hexes, "hexes"));

	store.dispatch(create<PlayerState>(playerId, initPlayerState, "player"));
}

function onPlayerLeave(player: Player) {
	store.dispatch(del(serializeUserId(player.UserId), "player"));
}
