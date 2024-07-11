import Roact from "@rbxts/roact";

const EndTurnButton: Roact.FunctionComponent = () => {
	const handleClick = () => {};

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
};

export default EndTurnButton;
