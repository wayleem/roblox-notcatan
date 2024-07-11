import { ReplicatedStorage } from "@rbxts/services";
import { INITIAL_SHAREDSTATE } from "shared/static";
import { ClientStore } from "shared/store";

// Get the remote event for client-server communication
const remoteEvent = ReplicatedStorage.WaitForChild("CatanRemoteEvent") as RemoteEvent;

// Create the ClientStore
export const clientStore = new ClientStore<SharedState>(INITIAL_SHAREDSTATE, remoteEvent);

print("Catan client initialized");

// You can add more client-side logic here, such as setting up UI events or game interactions
