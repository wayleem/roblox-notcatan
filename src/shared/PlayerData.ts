import Buildings from "./Building";
import DevCardHand from "./DevCardHand";
import ResourceHand from "./ResourceHand";
import Settings from "./Settings";
export default class PlayerData {
	player: Player;
	teamColor: string;

	resources: ResourceHand;
	devCards: DevCardHand;
	buildings: Buildings;

	numPlayedKnights: number;
	numVictoryPoints: number;

	constructor(player: Player, teamColor: string) {
		this.player = player;
		this.teamColor = teamColor;

		this.resources = new ResourceHand();
		this.devCards = new DevCardHand();
		this.buildings = new Buildings();

		this.numPlayedKnights = 0;
		this.numVictoryPoints = 0;
	}

	getColor(): string {
		return this.teamColor;
	}

	// Building
	canBuildRoad(): boolean {
		if (this.resources.hasResource({ wood: 1, brick: 1 }) || this.buildings.getBuilding("road") > 0) return true;
		return false;
	}

	buildRoad(): void {
		this.resources.removeResource({ wood: 1, brick: 1 });
		this.buildings.removeBuilding({ road: 1 });
	}

	canBuildSettlement(): boolean {
		if (
			this.resources.hasResource({ wood: 1, brick: 1, sheep: 1, wheat: 1 }) ||
			this.buildings.getBuilding("settlement") > 0
		)
			return true;
		return false;
	}

	buildSettlement(): void {
		this.resources.removeResource({ wood: 1, brick: 1, sheep: 1, wheat: 1 });
		this.buildings.removeBuilding({ settlement: 1 });
	}

	canBuildCity(): boolean {
		if (this.resources.hasResource({ ore: 3, wheat: 2 }) || this.buildings.getBuilding("city") > 0) return true;
		return false;
	}

	buildCity(): void {
		this.resources.removeResource({ ore: 3, wheat: 2 });
		this.buildings.removeBuilding({ city: 1 });
		this.buildings.addBuilding({ settlement: 1 });
	}

	canDrawDevCard(): boolean {
		if (this.resources.hasResource({ ore: 1, sheep: 1, wheat: 1 })) return true;
		return false;
	}

	drawDevCard(): void {
		this.resources.removeResource({ ore: 1, sheep: 1, wheat: 1 });
	}
}
