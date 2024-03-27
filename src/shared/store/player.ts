import { DataPayload, PlayerAction } from "shared/actions/player_actions";
import { DevCard, Resource, Road, Settlement, City } from "shared/types";

/*
 * Can store roads, settlements, and cities in one buildings: (Road | Settlement | City)[] array
 * but makes counting more complicated.
 */

export interface PlayerData {
  player: Player;
  teamColor: string;
  resources: Resource;
  devCards: DevCard;
  roads: Road[];
  settlements: Settlement[];
  cities: City[];
  numPlayedKnights: number;
  numVictoryPoints: number;
}

interface PlayersState {
  [playerId: string]: PlayerData;
}

export function playersReducer(state: PlayersState, action: PlayerAction): PlayersState {
  switch (action.type) {
    case 'UPDATE_RESOURCES':
      return updatePlayerData(state, action.payload, 'resources');
    case 'UPDATE_DEVCARDS':
      return updatePlayerData(state, action.payload, 'devCards');
    case 'UPDATE_ROADS':
      return updatePlayerData(state, action.payload, 'roads');
    case 'UPDATE_SETTLEMENTS':
      return updatePlayerData(state, action.payload, 'settlements');
    case 'UPDATE_CITIES':
      return updatePlayerData(state, action.payload, 'cities');
    case 'UPDATE_NUM_PLAYED_KNIGHTS':
      return updatePlayerData(state, action.payload, 'numPlayedKnights');
    case 'UPDATE_NUM_VICTORY_POINTS':
      return updatePlayerData(state, action.payload, 'numVictoryPoints');
    default:
      return state;
  }
}

function updatePlayerData(
  state: PlayersState,
  payload: DataPayload,
  key: keyof PlayerData,
): PlayersState {
  const { playerId, data } = payload;
  const playerState = state[playerId];
  if (!playerState) {
    return state;
  }

  return {
    ...state,
    [playerId]: {
      ...playerState,
      [key]: data,
    },
  };
}
