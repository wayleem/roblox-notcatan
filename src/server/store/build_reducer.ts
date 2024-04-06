import { ArrayT, City, Road, Settlement } from "shared/types";

export interface BuildState {
	roads: ArrayT<Road>;
	settlements: ArrayT<Settlement>;
	cities: ArrayT<City>;
}
