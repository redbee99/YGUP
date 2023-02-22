import { combineReducers } from "redux";
import headerReducer from "./headerReducer";
import modalReducer from "./modalReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    headerReducer,
    userReducer,
    modalReducer
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>