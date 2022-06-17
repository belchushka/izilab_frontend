import store from "./index";

export type AppStore = typeof store
export type AppState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
