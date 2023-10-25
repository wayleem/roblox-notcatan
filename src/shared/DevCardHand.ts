type DevCard = "knight" | "year_of_plenty" | "monopoly" | "road_building" | "point";

type DevCardMap = { [key in DevCard]?: number };

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

	removeDevCard(devCards: DevCardMap): void {
		for (const devCard in devCards) {
			const count = devCards[devCard as DevCard] || 0;
			const newCount = (this.devCards[devCard as DevCard] || 0) - count;
			if (newCount < 0) {
				error(`devCard underflow for ${devCard}`);
			}
			this.devCards[devCard as DevCard] = newCount;
		}
	}

	addDevCard(devCards: DevCardMap): void {
		for (const devCard in devCards) {
			const count = devCards[devCard as DevCard] || 0;
			const newCount = (this.devCards[devCard as DevCard] || 0) + count;
			this.devCards[devCard as DevCard] = newCount;
		}
	}

	getDevCard(devCard: DevCard): number {
		return this.devCards[devCard] || 0;
	}

	hasDevCard(devCards: DevCardMap): boolean {
		for (const devCard in devCards) {
			const count = devCards[devCard as DevCard] || 0;
			if ((this.devCards[devCard as DevCard] || 0) < count) {
				return false;
			}
		}
		return true;
	}
}
