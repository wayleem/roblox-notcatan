import { PlayerData } from "shared/types";
import { Resource, DevCard, Road, Settlement, City } from "shared/types";

export type DataPayload<T extends Resource | DevCard | Road | Settlement | City | number | PlayerData> = {
	playerId: number;
	data: T;
};

export type GameAction =
	| { type: "UPDATE_RESOURCES"; payload: DataPayload<Resource> }
	| { type: "UPDATE_DEVCARDS"; payload: DataPayload<DevCard> }
	| { type: "ADD_ROAD"; payload: DataPayload<Road> }
	| { type: "ADD_SETTLEMENT"; payload: DataPayload<Settlement> }
	| { type: "REMOVE_SETTLEMENT"; payload: DataPayload<Settlement> }
	| { type: "ADD_CITY"; payload: DataPayload<City> }
	| { type: "INCREMENT_PLAYED_KNIGHTS"; payload: DataPayload<number> }
	| { type: "UPDATE_VICTORY_POINTS"; payload: DataPayload<number> }
	| { type: "ADD_PLAYER"; payload: DataPayload<PlayerData> }
	| { type: "REMOVE_PLAYER"; payload: number };

export function update_resources(playerId: number, resources: Resource): GameAction {
	return {
		type: "UPDATE_RESOURCES",
		payload: { playerId, data: resources },
	};
}

export function update_dev_cards(playerId: number, devCard: DevCard): GameAction {
	return {
		type: "UPDATE_DEVCARDS",
		payload: { playerId, data: devCard },
	};
}

export function add_road(playerId: number, road: Road): GameAction {
	return {
		type: "ADD_ROAD",
		payload: { playerId, data: road },
	};
}

export function add_settlement(playerId: number, settlement: Settlement): GameAction {
	return {
		type: "ADD_SETTLEMENT",
		payload: { playerId, data: settlement },
	};
}

export function remove_settlement(playerId: number, settlement: Settlement): GameAction {
	return {
		type: "REMOVE_SETTLEMENT",
		payload: { playerId, data: settlement },
	};
}

export function add_city(playerId: number, city: City): GameAction {
	return {
		type: "ADD_CITY",
		payload: { playerId, data: city },
	};
}

export function increment_played_knights(playerId: number, count: number): GameAction {
	return {
		type: "INCREMENT_PLAYED_KNIGHTS",
		payload: { playerId, data: count },
	};
}

export function update_victory_points(playerId: number, points: number): GameAction {
	return {
		type: "UPDATE_VICTORY_POINTS",
		payload: { playerId, data: points },
	};
}

export function add_player(playerId: number, playerData: PlayerData): GameAction {
	return {
		type: "ADD_PLAYER",
		payload: { playerId, data: playerData },
	};
}

export function remove_player(playerId: number): GameAction {
	return {
		type: "REMOVE_PLAYER",
		payload: playerId,
	};
}
