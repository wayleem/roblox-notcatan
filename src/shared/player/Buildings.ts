import City from "shared/City";
import Road from "shared/Road";
import Settlement from "shared/Settlement";

type Items = {
	roads: Road[];
	settlements: [];
	cities: City[];
};

export default class Buildings {
	private roads: Road[];
	private settlements: Settlement[];
	private cities: City[];

	constructor(init: Items) {
		this.roads = init.roads;
		this.settlements = init.settlements;
		this.cities = init.cities;
	}

	add(key: keyof Items, player: Player, location: Vector3) {
		switch (key) {
			case "roads":
				this.roads.push(new Road(player, location));
				break;
			case "settlements":
				this.settlements.push(new Settlement(player, location));
				break;
			case "cities":
				this.cities.push(new City(player, location));
				break;
			default:
				error("Invalid key: ${key}");
		}
	}
}
