import { combineReducers } from "redux";
import headerReducer from "./headerReducer";
import modalReducer from "./modalReducer";
import userReducer from "./userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";



const rootReducer = combineReducers({
    headerReducer,
    userReducer,
    modalReducer
})

const persistConfig = {
    key: "root",
    // localStorage에 저장합니다.
    storage,
    // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
    whitelist: ["userReducer"]
    // blacklist -> 그것만 제외합니다
  };

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>

