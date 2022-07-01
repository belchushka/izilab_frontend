import {createSlice} from "@reduxjs/toolkit";


interface IInitialState {
    cart: any
}

const initialState: IInitialState = {
    cart: {
        ids: [],
        price: 0,
        analysis: [],
        gifts: [],
        semplings:[],
        price_with_stock: 0,
        sempling_price: 0
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
        addCartGift(state, action) {
            const new_cart = state.cart.gifts
            new_cart.push(action.payload)
            state.cart.gifts = Array.from(new Set(new_cart))
        },
        removeCartGift(state, action) {
            state.cart.gifts = state.cart.gifts.filter((el: any) => {
                return el !== action.payload
            })
        },
        setCartPrice(state, action) {
            state.cart.price = action.payload
        },
        setCartSemplings(state, action) {
            state.cart.semplings = action.payload
        },
        setCartPriceWithStock(state, action) {
            state.cart.price_with_stock = action.payload
        },
        setCartSemplingPrice(state, action) {
            state.cart.sempling_price = action.payload
        },
    }
})

export const {addAnalysis, removeAnalysis, setCartPrice, addCartGift,removeCartGift, setCartAnalysis,setCartSemplings, setCartSemplingPrice, setCartPriceWithStock} = userSlice.actions

export default userSlice.reducer
