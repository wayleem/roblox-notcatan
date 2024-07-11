import Roact from "@rbxts/roact";
import { withHooks } from "@rbxts/roact-hooked";
import { clientStore } from "client/store";
import { useStore } from "shared/store";

const GameDisplay: Roact.FunctionComponent = () => {
	const gameState = useStore(clientStore, (state) => state.game);

	const currentPlayer = gameState.turnOrder[gameState.currentTurnIndex];

	return (
		<frame
			Key="GameStateDisplay"
			Size={new UDim2(1, 0, 0, 50)}
			Position={new UDim2(0, 0, 0, 0)}
			BackgroundTransparency={1}
		>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				Padding={new UDim(0, 20)}
			/>
			<textlabel
				Key="CurrentTurn"
				Text={`Current Turn: Player ${currentPlayer}`}
				Size={new UDim2(0, 200, 1, 0)}
				BackgroundTransparency={1}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={18}
			/>
			<textlabel
				Key="GamePhase"
				Text={`Game Phase: ${gameState.gamePhase}`}
				Size={new UDim2(0, 200, 1, 0)}
				BackgroundTransparency={1}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={18}
			/>
			<textlabel
				Key="TurnPhase"
				Text={`Turn Phase: ${gameState.turnPhase}`}
				Size={new UDim2(0, 200, 1, 0)}
				BackgroundTransparency={1}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={18}
			/>
			<textlabel
				Key="TurnDirection"
				Text={`Turn Direction: ${gameState.isReversed ? "Reversed" : "Normal"}`}
				Size={new UDim2(0, 200, 1, 0)}
				BackgroundTransparency={1}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={18}
			/>
		</frame>
	);
};

export default withHooks(GameDisplay);
