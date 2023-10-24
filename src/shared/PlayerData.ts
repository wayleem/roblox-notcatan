import DevCardHand from "./DevCardHand";
import ResourceHand from "./ResourceHand";
import Settings from "./Settings";
export default class PlayerData {
	player: Player;
	teamColor: string;

	resources: ResourceHand;
	devCards: DevCardHand;

	numRoads: number;
	numSettlements: number;
	numCities: number;

	numPlayedKnights: number;
	numVictoryPoints: number;

	constructor(player: Player, teamColor: string) {
		this.player = player;
		this.teamColor = teamColor;

		this.resources = new ResourceHand();
    this.devCards = new DevCardHand();

		this.numRoads = Settings.INIT_ROADS;
		this.numSettlements = Settings.INIT_SETTLEMENTS;
		this.numCities = Settings.INIT_CITIES;
		this.numPlayedKnights = 0;
		this.numVictoryPoints = 0;
	}

	getColor(): string {
		return this.teamColor;
	}

	getNumRoads(): number {
		return this.numRoads;
	}

	getNumSettlements(): number {
		return this.numSettlements;
	}

	getNumCities(): number {
		return this.numCities;
	}


	buildRoad(): void {
    this.resources.removeResource('wood', 1)
    this.resources.removeResource('brick', 1)
		this.numRoads--;
	}

	buildSettlement(): void {
		this.removeResource(Resource.WOOD, 1);
		this.removeResource(Resource.BRICK, 1);
		this.removeResource(Resource.WHEAT, 1);
		this.removeResource(Resource.SHEEP, 1);
    this.numSettlements--;
	}

  buildCity(): void {
    this.removeResource(Resource.ORE, 3);
    this.removeResource(Resource.WHEAT, 2);
  }

  drawDev(): void {
    for (const [i, v] of Settings.)
  }
}
