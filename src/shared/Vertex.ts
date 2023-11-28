import { Building } from "./Buildings";
import City from "./City";
import Edge from "./Edge";
import PlayerData from "./PlayerData";
import Settlement from "./Settlement";

export default class Vertex {
	private position: Vector3;
	private edges: Edge[];
	private building?: Settlement | City;
	private part: Part | undefined;

	constructor(position: Vector3) {
		this.position = position;
		this.edges = [];
		this.building = undefined;
		this.part = undefined;
	}
	getPosition(): Vector3 {
		return this.position;
	}

	getEdges(): Edge[] {
		return this.edges;
	}

	getBuilding(): Settlement | City | undefined {
		return this.building;
	}

	getPart(): Part | undefined {
		return this.part;
	}

	addEdge(edge: Edge): Edge[] {
		this.edges.push(edge);
		return this.edges;
	}

	setPart(part: Part) {
		this.part = part;
	}

	//build physical building
	build(player: PlayerData, buildingType: Building): Settlement | City {
		if (buildingType === "settlement") {
			if (this.building) {
				error("A building already exists on this vertex.");
			}
			const settlement = new Settlement(this);
			this.building = settlement;
			player.getBuildings().add(settlement);
			return settlement;
		} else if (buildingType === "city") {
			if (!(this.building instanceof Settlement)) {
				error("No settlement to upgrade to a city.");
			}
			const city = new City(this.building);
			this.building = city;
			player.getBuildings().add(city);
			return city;
		} else {
			error("Invalid building type.");
		}
	}
}
