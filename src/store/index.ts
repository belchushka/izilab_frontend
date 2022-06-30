import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import analysisSlice from "./reducers/analysisSlice";
import citySlice from "./reducers/citySlice";

const store = configureStore({
    reducer: combineReducers({
        user: userSlice,
        analysis: analysisSlice,
        city: citySlice
    }),
})

export default store
