import City from "./City";
import Road from "./Road";
import Settings from "./Settings";
import Settlement from "./Settlement";
import Vertex from "./Vertex";

export type Building = "road" | "settlement" | "city";

export default class Buildings {
	private roads: Road[];
	private settlements: Settlement[];
	private cities: City[];

	constructor() {
		this.roads = [];
		this.settlements = [];
		this.cities = [];
	}

	add(building: Road | Settlement | City): void {
		if (building instanceof Road) {
			if (this.canBuild("road")) {
				this.roads.push(building);
			} else {
				error("Cannot build more roads.");
			}
		} else if (building instanceof Settlement) {
			if (this.canBuild("settlement", building.vertex)) {
				this.settlements.push(building);
			} else {
				error("Cannot build a settlement at this position.");
			}
		} else if (building instanceof City) {
			const settlementIndex = this.settlements.findIndex((s) => s.vertex === building.getVertex());
			if (settlementIndex !== -1) {
				this.cities.push(building);
				this.settlements = this.settlements.filter((_, index) => index !== settlementIndex);
			} else {
				error("No settlement to upgrade to a city at this position.");
			}
		} else {
			error("Invalid building type.");
		}
	}

	canBuild(BuildingType: Building, vertex?: Vertex): boolean {
		switch (BuildingType) {
			case "road":
				return this.roads.size() < Settings.INIT_ROADS;
			case "settlement":
				if (
					vertex === undefined ||
					this.settlements.size() >= Settings.INIT_SETTLEMENTS ||
					this.settlements.some((s) => s.vertex === vertex)
				) {
					return false;
				}

				// Ensure that there are no settlements one edge away
				for (const edge of vertex.getEdges()) {
					if (edge.getVertices().some((vertex) => vertex.getBuilding() instanceof Settlement)) {
						return false; // Cannot build if there's a settlement one edge away
					}
				}

				return true; // Can build if no settlements are found one edge away
			case "city":
				return (
					this.cities.size() < Settings.INIT_CITIES &&
					vertex !== undefined &&
					this.settlements.some((s) => s.vertex === vertex)
				);
			default:
				return false;
		}
	}
}
