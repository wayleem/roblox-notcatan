import Roact from "@rbxts/roact";
import { withHooks, useEffect, useState } from "@rbxts/roact-hooked";
import { clientStore } from "client/store";
import { Players } from "@rbxts/services";
import { serializeUserId } from "shared/utils";
import { INITIAL_DEV_CARDS } from "shared/static";
import Object from "@rbxts/object-utils";

const DevCardHand: Roact.FunctionComponent = withHooks(() => {
	const [devCards, setDevCards] = useState<Record<DevCardType, number>>(INITIAL_DEV_CARDS);
	const localPlayerId = serializeUserId(Players.LocalPlayer.UserId);

	useEffect(() => {
		// receive
		clientStore.registerHandler("SEND_DEVCARDS", (_, payload) => {
			if (typeIs(payload, "table") && "devCards" in payload) {
				setDevCards(payload.devCards as Record<DevCardType, number>);
			}
		});

		// request
		clientStore.remote("REQUEST_DEVCARDS", localPlayerId);
	}, []);

	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				Padding={new UDim(0, 10)}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>
			{Object.entries(devCards).map(([cardType, count]) => (
				<textbutton
					Key={cardType}
					Text={`${cardType}: ${count}`}
					Size={new UDim2(0, 100, 0, 50)}
					BackgroundColor3={Color3.fromRGB(0, 120, 215)}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextSize={14}
					Event={{
						MouseButton1Click: () => {
							clientStore.remote("USE_DEV_CARD", { cardType });
						},
					}}
				/>
			))}
		</frame>
	);
});

export default DevCardHand;
