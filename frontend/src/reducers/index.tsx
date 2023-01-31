import { combineReducers } from "redux";
import headerReducer from "./headerReducer";
import modalReducer from "./modalReducer";
import userReducer from "./userReducer";
import companyReducer from "./companyReducer";

const rootReducer = combineReducers({
    headerReducer,
    userReducer,
    modalReducer,
    companyReducer
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>