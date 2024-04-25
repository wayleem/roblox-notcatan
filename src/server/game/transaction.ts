import { PlayerState } from "server/store/players_reducer";
import { update } from "shared/actions";
import { merge_hand, multiply_payload, serialize_userid } from "shared/utils";
import { store } from "server/store";
import { Hex } from "shared/types";
import { DeckState } from "server/store/deck_reducer";
import Object from "@rbxts/object-utils";

export function tap_resource(hex: Hex) {
  hex.vertices.forEach((v) => {
    if (v.building) {
      const player = store.getState().players[v.building.ownerId]
      if (player) {

        const resources = { ...player.resources };
        const multiplier = v.building.points;
        const tap = multiply_payload(hex.resource, multiplier);


        /* add finite # of cards later
        const remove = multiply_payload(tap, -1)

        if (merge_hand())

        store.dispatch(update<DeckState>("", "resources", merge_hand(resources, remove), "deck"))
        */

        store.dispatch(update<PlayerState>(serialize_userid(v.building.ownerId), "resources", merge_hand(resources, tap), "player"));
      }
    }
  })
}

export function draw_devcard(player: Player) {
  const playerId = serialize_userid(player.UserId)
  const playerData = store.getState().players[playerId]
  const deck = store.getState().deck

  if (!playerData) return

  const availableCards = Object.entries(deck.devCards).filter(([card, count]) => count > 0);

  if (availableCards.size() === 0) {
    print("No development cards left to draw.");
    return
  }

  // Randomly select a card to draw
  const randomIndex = math.floor(math.random() * availableCards.size());
  const [selectedCard,] = availableCards[randomIndex];

  // Update the deck to remove one instance of the drawn card
  store.dispatch(update<DeckState>("", 'devCards', {
    [selectedCard]: deck.devCards[selectedCard] - 1
  }, "deck"
  ))

  store.dispatch(update<PlayerState>(serialize_userid(player.UserId), 'devCards', {
    ...playerData.devCards,
    [selectedCard]: (playerData.devCards[selectedCard] || 0) + 1
  }, 'player'));

  print(`Player drew a ${selectedCard} card.`);

}
