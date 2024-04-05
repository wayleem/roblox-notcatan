import { PlayerState } from "server/store/game_reducer";
import { GameAction } from "shared/actions/game_actions";

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

export function player_reducer(state: PlayerState = initPlayer, action: GameAction): PlayerState {
  switch (action.type) {
    case "UPDATE_RESOURCES":
      state.resources = action.payload.data
      return state
    case "UPDATE_DEVCARDS":
      state.devCards = action.payload.data
      return state
    case "ADD_ROAD":
      return state
    case "ADD_SETTLEMENT":
      return state
    case "REMOVE_SETTLEMENT":
      return state
    case "ADD_CITY":
      return state
    case "INCREMENT_PLAYED_KNIGHTS":
      return state
    case "UPDATE_VICTORY_POINTS":
      return state

    default:
      return state;
  }
}
