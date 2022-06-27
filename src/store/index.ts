import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";

const store = configureStore({
    reducer: combineReducers({
        user: userSlice
    }),
})

export default store
