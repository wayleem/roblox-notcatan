import { ReplicatedStorage } from "@rbxts/services";
import { store } from "./store";
import { update } from "shared/actions";
import { server } from "./events";
import { parseEventPayload } from "shared/utils";

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
		}
	} else {
		print("Received invalid payload: ", args[0]);
	}
});
