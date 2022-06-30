import {createSlice} from "@reduxjs/toolkit";


interface IInitialState {
    cart: any
}

const initialState: IInitialState = {
    cart: {
        ids: [],
        price: 0,
        analysis: [],
        gifts: []
    }
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        addAnalysis(state, action) {
            const new_cart = state.cart.ids
            new_cart.push(action.payload)
            state.cart.ids = Array.from(new Set(new_cart))
        },
        removeAnalysis(state, action) {
            state.cart.ids = state.cart.ids.filter((el: any) => {
                return el !== action.payload
            })
        },
        setCartAnalysis(state, action) {
            state.cart.analysis = action.payload
        },
        setCartGifts(state, action) {
            state.cart.gifts = action.payload
        },
        setCartPrice(state, action) {
            state.cart.price = action.payload
        },
    }
})

export const {addAnalysis, removeAnalysis, setCartPrice, setCartGifts, setCartAnalysis} = userSlice.actions

export default userSlice.reducer
