import store from "./index";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";

export type AppStore = typeof store
export type AppState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
export type AppThunkAction<RT = void> = ThunkAction<RT, AppState, unknown, Action>