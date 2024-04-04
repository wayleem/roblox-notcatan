import { Players } from "@rbxts/services";
import { add_player, remove_player } from "shared/actions/game_actions";
import { store } from "shared/store";
import { PlayerData } from "shared/types";

export function on_player_join(player: Player) {
	const initPlayer: PlayerData = {
		teamColor: "red", // placeholder
		resources: { wheat: 0, sheep: 0, ore: 0, wood: 0, brick: 0 },
		devCards: { knight: 0, year_of_plenty: 0, monopoly: 0, road_building: 0, point: 0 },
		roads: [],
		settlements: [],
		cities: [],
		numPlayedKnights: 0,
		numVictoryPoints: 0,
	};

	store.dispatch(add_player(player.UserId, initPlayer));
}

export function on_player_leave(player: Player) {
	store.dispatch(remove_player(player.UserId));
}
