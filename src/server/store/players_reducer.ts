import { MyActions } from "shared/actions";
import { DevCard, Resource, Road, Settlement, City, Edge, ArrayT } from "shared/types";
import { remote_update_client } from "shared/utils";

export interface PlayerState {
  teamColor: string;

  resources: Resource;
  devCards: DevCard;

  roads: Road[];
  settlements: Settlement[];
  cities: City[];

  numPlayedKnights: number;
  numVictoryPoints: number;
}

export function players_reducer(state: ArrayT<PlayerState> = {}, action: MyActions<PlayerState>): ArrayT<PlayerState> {
  if (action.target === "player")
    switch (action.type) {
      case "CREATE":
        remote_update_client<PlayerState>(action)
        return {
          ...state,
          [action.id]: action.data,
        };
      case "MERGE":
        remote_update_client<PlayerState>(action)
        const currentPlayerState = state[action.id];
        if (currentPlayerState) {
          return {
            ...state,
            [action.id]: {
              ...currentPlayerState,
              ...action.data,
            },
          };
        }
        return state;
      case "UPDATE_KEY":
        remote_update_client<PlayerState>(action)
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
        remote_update_client<PlayerState>(action)
        const newState = { ...state };
        delete newState[action.id];
        return newState;
      case "PING":
        remote_update_client<PlayerState>(action)
        return state;
      default:
        return state;
    }
  return state;
}
