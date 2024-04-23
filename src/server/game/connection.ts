import { create, del, flush } from "shared/actions";
import { store } from "server/store";
import { PlayerState } from "server/store/players_reducer";
import { serialize_userid } from "shared/utils";

export function on_player_join(player: Player) {
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

	const playerId = serialize_userid(player.UserId);

	store.dispatch(flush(playerId, store.getState().board.vertices, "vertex"));
	store.dispatch(flush(playerId, store.getState().board.edges, "edge"));
	store.dispatch(flush(playerId, store.getState().board.hexes, "hex"));

	store.dispatch(create<PlayerState>(playerId, initPlayer, "player"));
}

export function on_player_leave(player: Player) {
	store.dispatch(del(serialize_userid(player.UserId), "player"));
}
