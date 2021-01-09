const INITIAL_STATE = {
  items: null,
  item: null,
};

export const itemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SEARCH_RESULT":
      return { ...state, items: action.payload };
    case "SINGLE_ITEM":
      return { ...state, item: action.payload };

    default:
      return state;
  }
};
