import {createSlice} from "@reduxjs/toolkit";

interface IUserCity {
    id: number | null,
    name: string | null
}

interface IInitialState {
    city: IUserCity
}

const initialState: IInitialState = {
    city: {
        id: null,
        name: null
    }
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setCity(state, action) {
            state.city.id = action.payload.id;
            state.city.name = action.payload.name
        }
    }
})

export const {setCity} = userSlice.actions
export default userSlice.reducer
