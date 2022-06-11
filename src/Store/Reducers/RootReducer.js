import ListReducer from "./ListReducer";
import DetailReducer from "./DetailReducer";
import EvChainReducer from "./EvChainReducer";
import { combineReducers } from "redux";
const RootReducer = combineReducers({
  ListReducer,
  DetailReducer,
  EvChainReducer,
});
export default RootReducer;
