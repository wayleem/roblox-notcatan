import { PlayerState } from "server/store/players_reducer";
import { MyActions } from "shared/actions";

const initialState: PlayerState = {
  teamColor: "red",
  resources: { wheat: 0, sheep: 0, ore: 0, wood: 0, brick: 0 },
  devCards: { knight: 0, year_of_plenty: 0, monopoly: 0, road_building: 0, point: 0 },
  roads: [],
  settlements: [],
  cities: [],
  numPlayedKnights: 0,
  numVictoryPoints: 0,
};

export function player_reducer(state: PlayerState = initialState, action: MyActions<PlayerState>): PlayerState {
  if (action.target !== "player") return state;

  switch (action.type) {
    case "CREATE":
      return { ...state, ...action.data };
    case "MERGE":
      return { ...state, ...action.data };
    case "UPDATE_KEY":
      if (action.key in state) {
        return { ...state, [action.key]: action.value };
      }
      return state;
    case "DEL":
      return initialState;
    case "PING":
      return { ...state };
    default:
      return state;
  }
}
