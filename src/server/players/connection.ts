import { Players } from "@rbxts/services";
import { create, del } from "shared/actions";
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

  store.dispatch(create(serialize_userid(player.UserId), initPlayer, "player"));
}

export function on_player_leave(player: Player) {
  store.dispatch(del(serialize_userid(player.UserId), "player"),);
}
