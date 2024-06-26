import { store } from "server/store";
import { Players } from "@rbxts/services";
import Object from "@rbxts/object-utils";
import { serializeUserId } from "shared/utils";
import { clients } from "server/events";
import { initPlayerState } from "shared/store";
import { create, del } from "server/store/actions";

Players.PlayerAdded.Connect((player) => {
	const id = serializeUserId(player.UserId);
	create(id, initPlayerState, "player");
	print("player joined:", player.Name);

	const allPlayerIds = Object.keys(store.getState().entities.players);
	print("Current player IDs in the store:", allPlayerIds);
});

Players.PlayerRemoving.Connect((player) => {
	const id = serializeUserId(player.UserId);
	del(id, "player");
	print("Player leaving:", player.Name);

	const allPlayerIds = Object.keys(store.getState().entities.players);
	print("Current player IDs in the store:", allPlayerIds);
});

/*
	clients.FireClient(player, flush(playerId, store.getState().board.vertices, "vertex"));
	clients.FireClient(player, flush(playerId, store.getState().board.edges, "edges"));
	clients.FireClient(player, flush(playerId, store.getState().board.hexes, "hexes"));
  */
