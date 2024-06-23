import Roact from "@rbxts/roact";
import { useEffect, useState, withHooks } from "@rbxts/roact-hooked";
import { client, server } from "client/remote";

const PlayerList: Roact.FunctionComponent = () => {
	const [players, setPlayers] = useState<string[]>([]);

	useEffect(() => {
		// Fire the event to get the list of players
		server.FireServer({ event: "GET_PLAYERS" });

		// Set up the listener for receiving the list of players
		const connection = client.OnClientEvent.Connect((payload: EventPayload) => {
			if (payload.event === "GET_PLAYERS" && payload.data) {
				if (typeIs(payload.data, "table")) {
					const playerList = payload.data as string[];
					setPlayers(playerList);
				} else {
					warn("Received invalid data format for GET_PLAYERS event");
				}
			}
		});

		// Clean up the connection when the component is unmounted
		return () => connection.Disconnect();
	}, []);

	return (
		<frame Size={new UDim2(0, 200, 0, 400)} BackgroundColor3={new Color3(1, 1, 1)}>
			<uilistlayout />
			{players.map((player) => (
				<textlabel
					Key={player}
					Size={new UDim2(1, 0, 0, 50)}
					BackgroundColor3={new Color3(0.9, 0.9, 0.9)}
					Text={player}
				/>
			))}
		</frame>
	);
};

export default withHooks(PlayerList);
