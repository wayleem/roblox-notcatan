import { store } from "./store";
import { clients, server } from "./events";
import { parseEventPayload } from "shared/utils";
import Object from "@rbxts/object-utils";

server.OnServerEvent.Connect((player: Player, ...args: unknown[]) => {
	const payload = parseEventPayload(args);
	print("Parsed payload received: ", payload); // Log parsed payload for debugging

	if (payload) {
		const { event, data } = payload;
		print(`Event received from client: ${event}`);
		print("Data received: ", data);
		switch (event) {
			case "END_TURN":
				break;
			case "GET_PLAYERS":
				clients.FireClient(player, { event, data: Object.keys(store.getState().entities.players) });
				break;
		}
	} else {
		print("Received invalid payload: ", args[0]);
	}
});
