import { Players } from "@rbxts/services";
import Roact from "@rbxts/roact";
import EndTurnButton from "./EndTurnButton";
import GameDisplay from "./GameDisplay";
import TurnOrderDisplay from "./TurnOrderDisplay";
import DiceRoll from "./DiceRoll";
import ResourceCounter from "./ResourceCounter";
import DevCardHand from "./DevCardHand";

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

Roact.mount(
	<screengui ResetOnSpawn={false}>
		<frame Key="TopBar" Size={new UDim2(1, 0, 0, 50)} Position={new UDim2(0, 0, 0, 0)}>
			<GameDisplay />
		</frame>
		<frame Key="LeftSidebar" Size={new UDim2(0, 200, 1, -100)} Position={new UDim2(0, 0, 0, 50)}>
			<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 10)} />
			<TurnOrderDisplay />
			<ResourceCounter />
		</frame>
		<frame Key="RightSidebar" Size={new UDim2(0, 200, 1, -100)} Position={new UDim2(1, -200, 0, 50)}>
			<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 10)} />
			<DiceRoll />
			<EndTurnButton />
		</frame>
		<frame Key="BottomBar" Size={new UDim2(1, -400, 0, 100)} Position={new UDim2(0.5, -200, 1, -100)}>
			<DevCardHand />
		</frame>
	</screengui>,
	playerGui,
);
