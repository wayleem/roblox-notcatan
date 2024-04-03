import { PlayerData } from "shared/store/player_store";
import { Resource, DevCard, Road, Settlement, City } from "shared/types";

export type DataPayload<T extends Resource | DevCard | Road | Settlement | City | number> = {
  playerId: number
  data: T
}

export type PlayerAction =
  | { type: 'UPDATE_RESOURCES'; payload: DataPayload<Resource> }
  | { type: 'UPDATE_DEVCARDS'; payload: DataPayload<DevCard> }
  | { type: 'ADD_ROAD'; payload: DataPayload<Road> }
  | { type: 'ADD_SETTLEMENT'; payload: DataPayload<Settlement> }
  | { type: 'REMOVE_SETTLEMENT'; payload: DataPayload<Settlement> }
  | { type: 'ADD_CITY'; payload: DataPayload<City> }
  | { type: 'INCREMENT_PLAYED_KNIGHTS'; payload: DataPayload<number> }
  | { type: 'UPDATE_VICTORY_POINTS'; payload: DataPayload<number> }
  | { type: 'ADD_PLAYER'; payload: PlayerData }
  | { type: 'REMOVE_PLAYER'; payload: DataPayload<number> };


export function update_resources(playerId: number, resources: Resource): PlayerAction {
  return {
    type: 'UPDATE_RESOURCES',
    payload: { playerId, data: resources }
  };
}

export function update_dev_cards(playerId: number, devCard: DevCard): PlayerAction {
  return {
    type: 'UPDATE_DEVCARDS',
    payload: { playerId, data: devCard }
  };
}

export function add_road(playerId: number, road: Road): PlayerAction {
  return {
    type: 'ADD_ROAD',
    payload: { playerId, data: road }
  };
}

export function add_settlement(playerId: number, settlement: Settlement): PlayerAction {
  return {
    type: 'ADD_SETTLEMENT',
    payload: { playerId, data: settlement }
  };
}

export function remove_settlement(playerId: number, settlement: Settlement): PlayerAction {
  return {
    type: 'REMOVE_SETTLEMENT',
    payload: { playerId, data: settlement }
  };
}

export function add_city(playerId: number, city: City): PlayerAction {
  return {
    type: 'ADD_CITY',
    payload: { playerId, data: city }
  };
}

export function increment_played_knights(playerId: number, count: number): PlayerAction {
  return {
    type: 'INCREMENT_PLAYED_KNIGHTS',
    payload: { playerId, data: count }
  };
}

export function update_victory_points(playerId: number, points: number): PlayerAction {
  return {
    type: 'UPDATE_VICTORY_POINTS',
    payload: { playerId, data: points }
  };
}

export function add_player(playerData: PlayerData): PlayerAction {
  return {
    type: 'ADD_PLAYER',
    payload: playerData
  };
}

export function remove_player(playerId: number): PlayerAction {
  return {
    type: 'REMOVE_PLAYER',
    payload: { playerId, data: playerId }
  };
}
