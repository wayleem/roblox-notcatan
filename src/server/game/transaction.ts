import { PlayerState } from "server/store/players_reducer";
import { update } from "shared/actions";
import { serialize_userid, update_hand } from "shared/utils";
import { store } from "server/store";

export function tap_resource(p: Player) {
	const player = store.getState().players[serialize_userid(p.UserId)];

	if (player) {
		const resources = player.resources;
		const updated = update_hand(resources, "wheat", 5);

		store.dispatch(update<PlayerState>(serialize_userid(p.UserId), "resources", updated, "player"));
	}
}
