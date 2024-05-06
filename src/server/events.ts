import { ReplicatedStorage } from "@rbxts/services";
import { store } from "./store";
import { update } from "shared/actions";
import { GameState } from "client/local_store/game_reducer";

const endTurnEvent = ReplicatedStorage.WaitForChild("EndTurnEvent") as RemoteEvent;

endTurnEvent.OnServerEvent.Connect(() => {
	const count = store.getState().game.round + 1;
	print("starting round: " + count);
	store.dispatch(update<GameState>("", "round", count, "game"));
});
