import Object from "@rbxts/object-utils";
import { PlayerState } from "server/store/players_reducer";
import { MyActions } from "shared/actions";
import { ArrayT } from "shared/types";

const initPlayerState: PlayerState = {
  teamColor: "red",

  resources: {
    wheat: 0,
    sheep: 0,
    ore: 0,
    wood: 0,
    brick: 0,
  },
  devCards: {
    knight: 0,
    year_of_plenty: 0,
    monopoly: 0,
    road_building: 0,
    point: 0,
  },

  roads: [],
  settlements: [],
  cities: [],

  numPlayedKnights: 0,
  numVictoryPoints: 0,
}

export function player_reducer(state: PlayerState = initPlayerState, action: MyActions<PlayerState>): PlayerState {
  if (action.target === "player")
    switch (action.type) {
      case "MERGE":
        Object.assign(state, action.data)
        return state
      case "UPDATE_KEY":
        const playerToUpdate = state[action.id];
        if (playerToUpdate && action.key in playerToUpdate) {
          return {
            ...state,
            [action.id]: {
              ...playerToUpdate,
              [action.key]: action.value,
            },
          };
        }
        return state;
      case "DEL":
        const newState = { ...state };
        delete newState[action.id];
        return newState;
      case "PING":
        state = action.state;
        return state;
      default:
        return state;
    }
  return state;
}
