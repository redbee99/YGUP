import { combineReducers } from "redux";
import headerReducer from "./headerReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    headerReducer,
    userReducer
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>