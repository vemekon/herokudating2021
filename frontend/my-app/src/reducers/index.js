import { combineReducers } from "redux";
import { itemsReducer } from "./itemsReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  items: itemsReducer,
});

export default rootReducer;
