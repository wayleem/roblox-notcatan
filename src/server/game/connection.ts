import { create, del, flush } from "shared/actions";
import { store } from "server/store";
import { Players } from "@rbxts/services";
import Object from "@rbxts/object-utils";
import { PlayerState } from "server/store/player_reducer";
import { serializeUserId } from "shared/utils";

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
	const initPlayer: PlayerState = {
		teamColor: "red", // placeholder
		resources: { wheat: 0, sheep: 0, ore: 0, wood: 0, brick: 0 },
		devCards: { knight: 0, year_of_plenty: 0, monopoly: 0, road_building: 0, point: 0 },
		roads: [],
		settlements: [],
		cities: [],
		numPlayedKnights: 0,
		numVictoryPoints: 0,
	};

	const playerId = serializeUserId(player.UserId);

	store.dispatch(flush(playerId, store.getState().board.vertices, "vertex"));
	store.dispatch(flush(playerId, store.getState().board.edges, "edge"));
	store.dispatch(flush(playerId, store.getState().board.hexes, "hex"));

	store.dispatch(create<PlayerState>(playerId, initPlayer, "player"));
}

function onPlayerLeave(player: Player) {
	store.dispatch(del(serializeUserId(player.UserId), "player"));
}
