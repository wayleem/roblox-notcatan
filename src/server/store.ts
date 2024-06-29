import { ReplicatedStorage } from "@rbxts/services";
import { ServerStore } from "shared/store";

const remoteEvent = ReplicatedStorage.WaitForChild("StoreEvent") as RemoteEvent;
