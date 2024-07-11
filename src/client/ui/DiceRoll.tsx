import Roact from "@rbxts/roact";
import { useState, withHooks } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import { clientStore } from "client/store";
import { useStore } from "shared/store";
import { serializeUserId } from "shared/utils";

const DiceRoll: Roact.FunctionComponent = () => {
	const [isRolling, setIsRolling] = useState(false);
	const gameState = useStore(clientStore, (state) => state.game);
	const currentTurn = useStore(clientStore, (state) => state.game.turnOrder[state.game.currentTurnIndex]);
	const localId = serializeUserId(Players.LocalPlayer.UserId);

	const rollDice = () => {
		if (currentTurn === localId && !isRolling) {
			setIsRolling(true);
			clientStore.remote("ROLL_DICE");
		}
	};

	// Check if the dice roll has been updated
	if (isRolling && gameState.diceRoll[0] !== 0 && gameState.diceRoll[1] !== 0) {
		setIsRolling(false);
	}

	return (
		<frame
			Size={new UDim2(0, 200, 0, 100)}
			Position={new UDim2(0.5, -100, 0.5, -50)}
			BackgroundTransparency={1}
			Visible={!isRolling && currentTurn === localId}
		>
			<textlabel
				Text={`Dice: ${gameState.diceRoll[0]} - ${gameState.diceRoll[1]}`}
				Size={new UDim2(1, 0, 0.5, 0)}
				BackgroundTransparency={1}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={24}
			/>
			<textbutton
				Text={isRolling ? "Rolling..." : "Roll Dice"}
				Size={new UDim2(1, 0, 0.5, 0)}
				Position={new UDim2(0, 0, 0.5, 0)}
				BackgroundColor3={Color3.fromRGB(0, 120, 215)}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={18}
				Event={{
					MouseButton1Click: rollDice,
				}}
			/>
		</frame>
	);
};

export default withHooks(DiceRoll);
