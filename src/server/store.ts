import { ReplicatedStorage } from "@rbxts/services";
import { INITIAL_SERVERSTATE, INITIAL_SHAREDSTATE } from "shared/static";
import { ServerStore } from "shared/store";

// Initialize the remote event for client-server communication
const remoteEvent = new Instance("RemoteEvent");
remoteEvent.Name = "CatanRemoteEvent";
remoteEvent.Parent = ReplicatedStorage;

// Create the ServerStore
export const store = new ServerStore<SharedState, ServerState>(INITIAL_SHAREDSTATE, remoteEvent, INITIAL_SERVERSTATE);

print("Catan server initialized");
