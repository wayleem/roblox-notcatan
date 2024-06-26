import { Store, combineReducers } from "@rbxts/rodux";
import { entitiesReducer, singletonsReducer } from "./reducers";

const root_reducer = combineReducers({
	entities: entitiesReducer,
	singletons: singletonsReducer,
});

export const store = new Store(root_reducer);
