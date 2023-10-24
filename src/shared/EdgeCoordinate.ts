import VertexCoordinate from "./VertexCoordinate";

export default class EdgeCoordinate {
	startCoord: VertexCoordinate;
	endCoord: VertexCoordinate;

	constructor(startCoord: VertexCoordinate, endCoord: VertexCoordinate) {
		this.startCoord = startCoord;
		this.endCoord = endCoord;
	}

	getStartCoord(): VertexCoordinate {
		return this.startCoord;
	}

	getEndCoord(): VertexCoordinate {
		return this.endCoord;
	}

	equals(obj: unknown): boolean {
		if (!(obj instanceof EdgeCoordinate)) {
			return false;
		}

		const other = obj as EdgeCoordinate;
		if (this.startCoord === other.getStartCoord() && this.endCoord === other.getEndCoord()) {
			return true;
		}
		if (this.startCoord === other.getEndCoord() && this.endCoord === other.getStartCoord()) {
			return true;
		}

		return false;
	}

	hashCode(): number {
		return this.startCoord.hashCode() + this.endCoord.hashCode();
	}

	toString(): string {
		let result = "START: ";
		result += this.startCoord.toString();
		result += " END: ";
		result += this.endCoord.toString();
		return result;
	}
}
