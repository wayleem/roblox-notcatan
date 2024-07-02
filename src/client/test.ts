import { Players, ReplicatedStorage } from "@rbxts/services";
import { ClientStore } from "shared/store";
import { clientStore } from "./store";
import { serializeUserId } from "shared/utils";

//clientStore.sendToServer("START_TURN", serializeUserId(Players.LocalPlayer.UserId));
