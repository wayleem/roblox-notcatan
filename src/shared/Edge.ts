import Road from "./Road";
import Vertex from "./Vertex";

export default class Edge {
	private vertices: Vertex[] = [];
	private cframe: CFrame;
	private road: Road | undefined;
	private part: Part | undefined;

	constructor(edgeStart: Vertex, edgeEnd: Vertex) {
		this.vertices.push(edgeStart);
		this.vertices.push(edgeEnd);
		this.cframe = CFrame.lookAt(edgeStart.getPosition().add(edgeEnd.getPosition()).div(2), edgeEnd.getPosition());
		this.road = undefined;
		this.part = undefined;

		edgeStart.addEdge(this);
		edgeEnd.addEdge(this);
	}

	getVertices(): Vertex[] {
		return this.vertices;
	}

	getCFrame(): CFrame {
		return this.cframe;
	}

	getRoad(): Road | undefined {
		return this.road;
	}

	getPart(): Part | undefined {
		return this.part;
	}

	buildRoad(): Road {
		return new Road(this);
	}

	setPart(part: Part) {
		this.part = part;
	}
}
