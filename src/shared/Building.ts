export default abstract class Building {
	protected owner: Player;
	protected location: Vector3;

	constructor(owner: Player, location: Vector3) {
		this.owner = owner;
		this.location = location;

		this.build();
	}

	getOwner(): Player {
		return this.owner;
	}

	getLocation(): Vector3 {
		return this.location;
	}

	abstract build(): Part;

	abstract getType(): string;
}
