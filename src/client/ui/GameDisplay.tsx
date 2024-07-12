import Roact from "@rbxts/roact";
import { useStore } from "shared/store";
import { clientStore } from "client/store";
import { withHooks } from "@rbxts/roact-hooked";

const GameDisplay: Roact.FunctionComponent = () => {
	const gameState = useStore(clientStore, (state) => state.game);

	const currentPlayer = gameState.turnOrder[gameState.currentTurnIndex];

	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				Padding={new UDim(0, 20)}
			/>
			<textlabel
				Text={`Current Turn: Player ${currentPlayer}`}
				Size={new UDim2(0, 200, 0, 30)}
				BackgroundTransparency={1}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={18}
			/>
			{gameState.gamePhase !== "setup" && (
				<textlabel
					Text={`Turn Phase: ${gameState.turnPhase}`}
					Size={new UDim2(0, 200, 0, 30)}
					BackgroundTransparency={1}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextSize={18}
				/>
			)}
		</frame>
	);
};

export default withHooks(GameDisplay);
