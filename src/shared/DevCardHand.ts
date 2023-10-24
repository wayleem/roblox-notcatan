type DevCard = "knight" | "year_of_plenty" | "monopoly" | "road_building" | "point";

export default class DevCardHand {
	devCards: Record<DevCard, number>;

	constructor() {
		this.devCards = {
			knight: 0,
			year_of_plenty: 0,
			monopoly: 0,
			road_building: 0,
			point: 0,
		};
	}

	removeDevCard(devCard: DevCard, count: number): void {
		const newCount = this.devCards[devCard] - count;
		if (newCount < 0) {
			error(`devCard underflow for ${devCard}`);
		}
		this.devCards[devCard] = newCount;
	}

	adddevCard(devCard: DevCard, count: number): void {
		const newCount = this.devCards[devCard] + count;
		this.devCards[devCard] = newCount;
	}

	getdevCard(devCard: DevCard): number {
		return this.devCards[devCard];
	}

	hasdevCard(devCard: DevCard, count: number): boolean {
		return this.devCards[devCard] >= count;
	}
}
