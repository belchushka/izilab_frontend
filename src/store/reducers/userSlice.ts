import {createSlice} from "@reduxjs/toolkit";
import {AppState} from "../types";


interface IInitialState {
    name: string,
    phone: string,
    email: string,
    birthday: string,
    parent_name: string,
    sex: string,
    parent_birthday: string,
    cart: any
}

const initialState: IInitialState = {
    name: null,
    phone: null,
    email: null,
    birthday: null,
    parent_name: null,
    parent_birthday: null,
    sex: null,
    cart: {
        ids: [],
        price: 0,
        analysis: [],
        alerts: [],
        piece_alerts: [],
        gifts: [],
        semplings: [],
        semple_preparations: [],
        price_with_stock: 0,
        sempling_price: 0,
        semple_preparation_price: 0,
        office_id: null,
        date: null,
        not_performed_ids: [],
        can_continue: true
    }
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setCart(state, action) {
            state.cart = {
                ...state.cart,
                ...action.payload
            }
        },
        setUserInfo(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        addAnalysis(state, action) {
            const new_cart = state.cart.ids
            new_cart.push(action.payload)
            state.cart.ids = Array.from(new Set(new_cart))
            localStorage.setItem('user_cart', JSON.stringify(new_cart))
        },
        clearCart(state, action) {
            return initialState
        },
        removeAnalysis(state, action) {
            const new_cart = state.cart.ids.filter((el: any) => {
                return el !== action.payload
            })
            state.cart.ids = new_cart
            localStorage.setItem('user_cart', JSON.stringify(new_cart))
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
        setCartGifts(state,action){
            state.cart.gifts = action.payload
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
        setCartOfficeId(state, action) {
            state.cart.office_id = action.payload
        },
        setCartDate(state, action) {
            state.cart.date = action.payload
        }
    }
})

export const {
    addAnalysis,
    removeAnalysis,
    addCartGift,
    removeCartGift,
    setCartOfficeId,
    setCartDate,
    setCart,
    clearCart,
    setUserInfo,
    setCartGifts
} = userSlice.actions

export const cartTotalPrice = (state: AppState) => {
    const cart = state.user.cart
    return cart.sempling_price + cart.price_with_stock + cart.semple_preparation_price
}

export default userSlice.reducer
