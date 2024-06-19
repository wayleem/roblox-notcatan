import Roact from "@rbxts/roact";
import { ReplicatedStorage } from "@rbxts/services";

export default function endTurnButton(): Roact.Element {
	const handleClick = () => {
		const endTurnEvent = ReplicatedStorage.WaitForChild("EndTurnEvent") as RemoteEvent;
		endTurnEvent.FireServer();
	};

	return (
		<textbutton
			Key="EndTurnButton"
			Text="End Turn"
			Size={new UDim2(0, 200, 0, 50)}
			Position={new UDim2(0, 400, 0, 400)}
			BackgroundColor3={Color3.fromRGB(51, 151, 255)}
			TextColor3={Color3.fromRGB(255, 255, 255)}
			Event={{
				Activated: handleClick,
			}}
		/>
	);
}
