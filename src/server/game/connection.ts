import { Players } from "@rbxts/services";
import { store } from "server/store";
import { serializeUserId } from "shared/utils";

Players.PlayerAdded.Connect((player) => {
	const playerId = serializeUserId(player.UserId);
	store.update("players", {
		...store.getState().players,
		[playerId]: {
			knightsPlayed: 0,
			longestRoadLength: 0,
			totalResources: 0,
			victoryPoints: 0,
			devCards: {
				knight: 0,
				year_of_plenty: 0,
				monopoly: 0,
				road_building: 0,
				point: 0,
			},
			resources: {
				wheat: 0,
				sheep: 0,
				ore: 0,
				wood: 0,
				brick: 0,
			},
		},
	});
});
