import { PlayerData } from "shared/store/player_store";
import { Resource, DevCard, Road, Settlement, City } from "shared/types";

export type DataPayload<T extends Resource | DevCard | Road[] | Settlement[] | City[] | number> = {
  playerId: number
  data: T
}

export type PlayerAction =
  | { type: 'UPDATE_RESOURCES'; payload: DataPayload<Resource> }
  | { type: 'UPDATE_DEVCARDS'; payload: DataPayload<DevCard> }
  | { type: 'UPDATE_ROADS'; payload: DataPayload<Road[]> }
  | { type: 'UPDATE_SETTLEMENTS'; payload: DataPayload<Settlement[]> }
  | { type: 'UPDATE_CITIES'; payload: DataPayload<City[]> }
  | { type: 'UPDATE_NUM_PLAYED_KNIGHTS'; payload: DataPayload<number> }
  | { type: 'UPDATE_NUM_VICTORY_POINTS'; payload: DataPayload<number> }
  | { type: 'ADD_PLAYER'; payload: { playerId: number, data: PlayerData } }

/* A more generic approach but might make the reducer harder to read.
 * Would require dispatch to be given a key which makes it less safe.
function updatePlayerState<T extends keyof PlayerState>(playerId: string, key: T, value: PlayerState[T]) {
    return {
        type: 'UPDATE_PLAYER_STATE',
        payload: { playerId, key, value },
    };
}
*/

export function update_resources<Resource>(playerId: string, resource: Resource) {
  return {
    type: 'UPDATE_RESOURCES',
    payload: {
      playerId,
      data: resource,
    }
  }
}

export function update_devcards(playerId: string, devCard: DevCard) {
  return {
    type: 'UPDATE_DEVCARDS',
    payload: {
      playerId,
      data: devCard,
    }
  }
}

export function update_roads(playerId: string, roads: Road[]) {
  return {
    type: 'UPDATE_ROADS',
    payload: {
      playerId,
      data: roads
    }
  }
}

export function update_settlements(playerId: string, settlements: Settlement[]) {
  return {
    type: 'UPDATE_ROADS',
    payload: {
      playerId,
      data: settlements
    }
  }
}

export function update_cities(playerId: string, roads: City[]) {
  return {
    type: 'UPDATE_ROADS',
    payload: {
      playerId,
      data: roads
    }
  }
}

export function update_num_played_knights(playerId: string, knightsPlayed: number) {
  return {
    type: 'UPDATE_ROADS',
    payload: {
      playerId,
      data: knightsPlayed
    }
  }
}

export function update_num_victory_points(playerId: string, victoryPoints: number) {
  return {
    type: 'UPDATE_ROADS',
    payload: {
      playerId,
      data: victoryPoints
    }
  }
}

export function add_player(playerId: number, data: PlayerData) {
  return {
    type: 'ADD_PLAYER',
    payload: {
      playerId,
      data
    }
  }
}
