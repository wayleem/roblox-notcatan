import { MyActions } from "shared/actions";
import { DevCard, Resource } from "shared/types";

export interface DeckState {
  resources: Resource;
  devCards: DevCard;
}

const initResources: Resource = { wheat: 0, sheep: 0, ore: 0, wood: 0, brick: 0 };
const initDevCards: DevCard = { knight: 0, year_of_plenty: 0, monopoly: 0, road_building: 0, point: 0 };

const initDeck: DeckState = {
  resources: { ...initResources },
  devCards: { ...initDevCards },
};

export function deck_reducer(state: DeckState = initDeck, action: MyActions<DeckState>): DeckState {
  if (action.target === "deck") {
    switch (action.type) {
      case "CREATE":
        return {
          resources: action.data.resources || state.resources,
          devCards: action.data.devCards || state.devCards
        };
      case "MERGE":
        return {
          resources: { ...state.resources, ...action.data.resources },
          devCards: { ...state.devCards, ...action.data.devCards }
        };
      case "UPDATE_KEY":
        if (action.key in state.resources) {
          return {
            ...state,
            resources: {
              ...state.resources,
              [action.key]: action.value
            }
          };
        } else if (action.key in state.devCards) {
          return {
            ...state,
            devCards: {
              ...state.devCards,
              [action.key]: action.value
            }
          };
        }
        return state;
      case "DEL":
        return {
          ...state,
          resources: { ...state.resources, [action.id]: 0 },
          devCards: { ...state.devCards, [action.id]: 0 }
        };
      case "PING":
        return state;
    }
  }
  return state;
}
