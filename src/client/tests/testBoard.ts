import { clientStore } from "client/store";

export default function testBoard() {
	wait(2);

	print(clientStore.getState().board);

	wait(4);

	print(clientStore.getState().board);
}
