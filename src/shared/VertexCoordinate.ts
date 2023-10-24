import HexCoordinate from "./HexCoordinate";

export default class VertexCoordinate {
	coord1: HexCoordinate;
	coord2: HexCoordinate;
	coord3: HexCoordinate;

	constructor(coord1: HexCoordinate, coord2: HexCoordinate, coord3: HexCoordinate) {
		this.coord1 = coord1;
		this.coord2 = coord2;
		this.coord3 = coord3;
	}

	getCoord1(): HexCoordinate {
		return this.coord1;
	}

	getCoord2(): HexCoordinate {
		return this.coord2;
	}

	getCoord3(): HexCoordinate {
		return this.coord3;
	}

	hashCode(): number {
		let result = this.coord1 === undefined ? 0 : this.coord1.hashCode();
		result += this.coord2 === undefined ? 0 : this.coord2.hashCode();
		result += this.coord3 === undefined ? 0 : this.coord3.hashCode();
		return result;
	}

	equals(obj: unknown): boolean {
		if (!(obj instanceof VertexCoordinate)) {
			return false;
		}

		const toComp: VertexCoordinate = obj;

		if (
			this.coord1.equals(toComp.getCoord1()) &&
			this.coord2.equals(toComp.getCoord2()) &&
			this.coord3.equals(toComp.getCoord3())
		) {
			return true;
		}
		if (
			this.coord1.equals(toComp.getCoord1()) &&
			this.coord2.equals(toComp.getCoord3()) &&
			this.coord3.equals(toComp.getCoord2())
		) {
			return true;
		}
		if (
			this.coord1.equals(toComp.getCoord2()) &&
			this.coord2.equals(toComp.getCoord1()) &&
			this.coord3.equals(toComp.getCoord3())
		) {
			return true;
		}
		if (
			this.coord1.equals(toComp.getCoord3()) &&
			this.coord2.equals(toComp.getCoord2()) &&
			this.coord3.equals(toComp.getCoord1())
		) {
			return true;
		}
		if (
			this.coord1.equals(toComp.getCoord3()) &&
			this.coord2.equals(toComp.getCoord1()) &&
			this.coord3.equals(toComp.getCoord2())
		) {
			return true;
		}
		if (
			this.coord1.equals(toComp.getCoord2()) &&
			this.coord2.equals(toComp.getCoord3()) &&
			this.coord3.equals(toComp.getCoord1())
		) {
			return true;
		}

		return false;
	}

	toString(): string {
		return `${this.coord1.toString()}, ${this.coord2.toString()}, ${this.coord3.toString()}`;
	}
}
