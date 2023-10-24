export default class HexCoordinate {
	static TOLERANCE = 0.001;
	x: number;
	y: number;
	z: number;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	getX(): number {
		return this.x;
	}

	getY(): number {
		return this.y;
	}

	getZ(): number {
		return this.z;
	}

	cartesianX(): number {
		return -0.5 * this.x + this.y + -0.5 * this.z;
	}

	cartesianY(): number {
		return -(math.sqrt(3) / 2) * this.x + (math.sqrt(3) / 2) * this.z;
	}

	hashCode(): number {
		const prime = 31;
		let result = 1;
		result = prime * result + math.round(this.cartesianX() / HexCoordinate.TOLERANCE);
		result = prime * result + math.round(this.cartesianY() / HexCoordinate.TOLERANCE);
		return result;
	}

	equals(obj: unknown): boolean {
		if (this === obj) {
			return true;
		}
		if (obj === undefined) {
			return false;
		}
		if (!(obj instanceof HexCoordinate)) {
			return false;
		}

		const other: HexCoordinate = obj;

		if (!(math.abs(this.cartesianX() - other.cartesianX()) < HexCoordinate.TOLERANCE)) {
			return false;
		}
		if (!(math.abs(this.cartesianY() - other.cartesianY()) < HexCoordinate.TOLERANCE)) {
			return false;
		}

		return true;
	}

	toString(): string {
		return `(${this.x}, ${this.y}, ${this.z})`;
	}
}
