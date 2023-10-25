import Settings from "./Settings";

type Building = "road" | "settlement" | "city";

type BuildingMap = { [key in Building]?: number };

export default class Buildings {
	buildings: Record<Building, number>;
	constructor() {
		this.buildings = {
			road: Settings.INIT_ROADS,
			settlement: Settings.INIT_SETTLEMENTS,
			city: Settings.INIT_CITIES,
		};
	}

	// Number of Buildings available
	removeBuilding(buildings: BuildingMap): void {
		for (const building in buildings) {
			const count = buildings[building as Building] || 0;
			const newCount = (this.buildings[building as Building] || 0) - count;
			if (newCount < 0) {
				error(`building underflow for ${building}`);
			}
			this.buildings[building as Building] = newCount;
		}
	}

	addBuilding(buildings: BuildingMap): void {
		for (const building in buildings) {
			const count = buildings[building as Building] || 0;
			const newCount = (this.buildings[building as Building] || 0) + count;
			this.buildings[building as Building] = newCount;
		}
	}

	getBuilding(building: Building): number {
		return this.buildings[building] || 0;
	}

	hasBuilding(buildings: BuildingMap): boolean {
		for (const building in buildings) {
			const count = buildings[building as Building] || 0;
			if ((this.buildings[building as Building] || 0) < count) {
				return false;
			}
		}
		return true;
	}
}
