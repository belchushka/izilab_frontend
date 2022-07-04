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
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['user/setCartDate'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: ['items.dates'],
            },
        }),
})

export default store
