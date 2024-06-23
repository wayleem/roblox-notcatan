interface Building {
	ownerId: number;
	part?: Part;
}

interface Road extends Building {
	edge: Edge;
}

interface Settlement extends Building {
	vertex: Vertex;
	points: 1;
}

interface City extends Building {
	vertex: Vertex;
	points: 2;
}
