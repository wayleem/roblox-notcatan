import { Players } from "@rbxts/services";
import PlayerList from "./player_list";
import Roact from "@rbxts/roact";

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

Roact.mount(
	<screengui>
		<PlayerList />
	</screengui>,
	playerGui,
);
