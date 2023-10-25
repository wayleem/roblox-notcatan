import City from "./City";
import Road from "./Road";
import Settings from "./Settings";
import Settlement from "./Settlement";

const buildingKeys = ["road", "settlement", "city"];
type Building = (typeof buildingKeys)[number];
type BuildingMap = Partial<Record<Building, number>>;

export default class Buildings {
	numRoads: number;
	numSettlements: number;
	numCities: number;

	roads: Road[];
	settlements: Settlement[];
	cities: City[];

	constructor() {
		this.numRoads = Settings.INIT_ROADS;
		this.numSettlements = Settings.INIT_SETTLEMENTS;
		this.numCities = Settings.INIT_CITIES;

		this.roads = [];
		this.settlements = [];
		this.cities = [];
	}

	removeBuilding(buildings: BuildingMap): void {
		buildingKeys.forEach((building) => {
			const count = buildings[building] || 0;
			const newCount = (this[building as keyof this] as number) - count;
			if (newCount < 0) {
				error(`Building underflow for ${building}`);
			}
			(this[building as keyof this] as number) = newCount;
		});
	}

	addBuilding(buildings: BuildingMap): void {
		buildingKeys.forEach((building) => {
			const count = buildings[building] || 0;
			const newCount = (this[building as keyof this] as number) + count;
			(this[building as keyof this] as number) = newCount;
		});
	}

	getBuilding(building: Building): number {
		return (this[building as keyof this] as number) || 0;
	}

	hasBuilding(buildings: BuildingMap): boolean {
		return buildingKeys.every((building) => {
			const count = buildings[building] || 0;
			return (this[building as keyof this] as number) >= count;
		});
	}
}
