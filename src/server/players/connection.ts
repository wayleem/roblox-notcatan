import { Players } from "@rbxts/services";
import { add_player } from "shared/actions/player_actions";
import { store } from "shared/store";
import { PlayerData } from "shared/store/player_store";

Players.PlayerAdded.Connect(on_player_join)

function on_player_join(player: Player) {
  const initPlayer: PlayerData = {
    player: player,
    teamColor: "red", // placeholder
    resources: { wheat: 0, sheep: 0, ore: 0, wood: 0, brick: 0 },
    devCards: { knight: 0, year_of_plenty: 0, monopoly: 0, road_building: 0, point: 0 },
    roads: [],
    settlements: [],
    cities: [],
    numPlayedKnights: 0,
    numVictoryPoints: 0,
  }

  store.dispatch(add_player(player.UserId, initPlayer));
}
