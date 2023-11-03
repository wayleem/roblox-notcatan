import City from "./City";
import Edge from "./Edge";
import PlayerData from "./PlayerData";
import Settlement from "./Settlement";
import VertexCoordinate from "./VertexCoordinate";

export default class Vertex {
	edges: Edge[];
	building?: Settlement | City;
	position: VertexCoordinate;

	constructor(position: VertexCoordinate) {
		this.position = position;
		this.building = undefined;
		this.edges = [];
	}

	getPosition(): VertexCoordinate {
		return this.position;
	}

	buildSettlement(player: PlayerData): void {
		if (this.building === undefined) {
			this.building = new Settlement(player, this);
			//		player.buildings.removeBuilding({ settlement: 1 });
			player.buildings.settlements.push(this.building as Settlement);
		}
	}
}
