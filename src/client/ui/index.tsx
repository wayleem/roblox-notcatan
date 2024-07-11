import { Players } from "@rbxts/services";
import Roact from "@rbxts/roact";
import EndTurnButton from "./EndTurnButton";
import GameDisplay from "./GameDisplay";
import TurnOrderDisplay from "./TurnOrderDisplay";
import DiceRoll from "./DiceRoll";

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

Roact.mount(
	<screengui>
		<GameDisplay />
		<EndTurnButton />
		<TurnOrderDisplay />
		<DiceRoll />
	</screengui>,
	playerGui,
);
