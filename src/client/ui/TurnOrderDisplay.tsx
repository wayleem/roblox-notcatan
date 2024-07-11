import Roact from "@rbxts/roact";
import { useStore } from "shared/store";
import { clientStore } from "client/store";
import { withHooks } from "@rbxts/roact-hooked";

const TurnOrderDisplay: Roact.FunctionComponent = () => {
	const gameState = useStore(clientStore, (state) => state.game);
	const players = useStore(clientStore, (state) => state.players);

	return (
		<frame
			Size={new UDim2(0, 200, 0, 300)}
			Position={new UDim2(1, -220, 0, 20)}
			BackgroundTransparency={0.5}
			BackgroundColor3={Color3.fromRGB(0, 0, 0)}
		>
			<textlabel
				Text="Turn Order"
				Size={new UDim2(1, 0, 0, 30)}
				BackgroundTransparency={1}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={18}
			/>
			<scrollingframe Size={new UDim2(1, 0, 1, -30)} Position={new UDim2(0, 0, 0, 30)} BackgroundTransparency={1}>
				<uilistlayout Padding={new UDim(0, 5)} />
				{gameState.turnOrder.map((playerId, index) => (
					<textlabel
						Key={playerId}
						Text={`${index + 1}. Player ${playerId}`}
						Size={new UDim2(1, 0, 0, 25)}
						BackgroundColor3={
							index === gameState.currentTurnIndex
								? Color3.fromRGB(0, 120, 215)
								: Color3.fromRGB(40, 40, 40)
						}
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextSize={16}
					/>
				))}
			</scrollingframe>
		</frame>
	);
};

export default withHooks(TurnOrderDisplay);
