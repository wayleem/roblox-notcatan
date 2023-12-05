import { Resource } from "shared/types/Resource";
import Hand from "./Hand";
import { DevCard } from "shared/types/DevCard";
import Buildings from "./Buildings";

export default class PlayerData {
	private player: Player;
	private teamColor: string;

	private resources: Hand<Resource>;
	private devCards: Hand<DevCard>;
	private buildings: Buildings;

	private numPlayedKnights: number;
	private numVictoryPoints: number;

	private turn: boolean;

	constructor(player: Player, teamColor: string) {
		this.player = player;
		this.teamColor = teamColor;

		this.resources = new Hand<Resource>({ wheat: 0, sheep: 0, ore: 0, wood: 0, brick: 0 });
		this.devCards = new Hand<DevCard>({ knight: 0, year_of_plenty: 0, monopoly: 0, road_building: 0, point: 0 });
		this.buildings = new Buildings({ roads: [], settlements: [], cities: [] });

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

	getResources(): Hand<Resource> {
		return this.resources;
	}

	getDevCards(): Hand<DevCard> {
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
