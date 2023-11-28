import Buildings from "./Buildings";
import DevCardHand from "./DevCardHand";
import ResourceHand from "./ResourceHand";
export default class PlayerData {
	private player: Player;
	private teamColor: string;

	private resources: ResourceHand;
	private devCards: DevCardHand;
	private buildings: Buildings;

	private numPlayedKnights: number;
	private numVictoryPoints: number;

	private turn: boolean;

	constructor(player: Player, teamColor: string) {
		this.player = player;
		this.teamColor = teamColor;

		this.resources = new ResourceHand();
		this.devCards = new DevCardHand();
		this.buildings = new Buildings();

		this.numPlayedKnights = 0;
		this.numVictoryPoints = 0;
		this.turn = false;
	}

	getPlayer(): Player {
		return this.player;
	}

	getColor(): string {
		return this.teamColor;
	}

	getResourceHand(): ResourceHand {
		return this.resources;
	}

	getDevCardHand(): DevCardHand {
		return this.devCards;
	}

	getBuildings(): Buildings {
		return this.buildings;
	}

	getNumPlayedKnights(): number {
		return this.numPlayedKnights;
	}

	getNumVictoryPoints(): number {
		return this.numVictoryPoints;
	}

	getTurn(): boolean {
		return this.turn;
	}

	canDrawDevCard(): boolean {
		if (this.resources.has({ ore: 1, sheep: 1, wheat: 1 })) return true;
		return false;
	}

	drawDevCard(): void {
		this.resources.deduct({ ore: 1, sheep: 1, wheat: 1 });
	}
}
