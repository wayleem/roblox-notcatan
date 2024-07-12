import Roact from "@rbxts/roact";
import { withHooks, useEffect, useState } from "@rbxts/roact-hooked";
import { clientStore } from "client/store";
import { Players } from "@rbxts/services";
import { serializeUserId } from "shared/utils";
import Object from "@rbxts/object-utils";
import { INITIAL_RESOURCES } from "shared/static";

const ResourceCounter: Roact.FunctionComponent = withHooks(() => {
	const [resources, setResources] = useState<Record<ResourceType, number>>(INITIAL_RESOURCES);
	const localPlayerId = serializeUserId(Players.LocalPlayer.UserId);

	useEffect(() => {
		//receive
		clientStore.registerHandler("SEND_RESOURCES", (_, payload) => {
			if (typeIs(payload, "table") && "resources" in payload) {
				setResources(payload.resources as Record<ResourceType, number>);
			}
		});

		//request
		clientStore.remote("REQUEST_RESOURCES", localPlayerId);
	}, []);

	return (
		<frame Size={new UDim2(1, 0, 0, 150)} BackgroundTransparency={1}>
			<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 5)} />
			{Object.entries(resources).map(([resource, count]) => (
				<textlabel
					Key={resource}
					Text={`${resource}: ${count}`}
					Size={new UDim2(1, 0, 0, 25)}
					BackgroundTransparency={1}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextSize={16}
				/>
			))}
		</frame>
	);
});

export default ResourceCounter;
