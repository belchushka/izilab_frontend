import {AppDispatch, AppThunkAction} from "../types";
import {$host} from "../../http";
import {setCartAnalysis, setCartGifts, setCartPrice} from "../reducers/userSlice";


export const sendSupportRequest: AppThunkAction = (name, phone) => async (dispatch: AppDispatch) => {
    try {
        const data = await $host.post("user/request_support", {
            name: name,
            phone: phone
        })
    } catch (e) {
        return e
    }
}

export const countCartPriceWithoutData: AppThunkAction = (cart) => async (dispatch: AppDispatch) => {
    try {
        const {data: price} = await $host.post("analysis/count_cart_price_without_data", {
            cart: cart
        })
        dispatch(setCartPrice(price))
    } catch (e) {
        return e
    }
}

export const countCartPrice: AppThunkAction = (cart, office_id, date) => async (dispatch: AppDispatch) => {
    try {
        const data: any = await $host.post("analysis/count_cart_price", {
            cart: cart,
            office_id,
            date
        })
        dispatch(setCartPrice(data.price))
        if (data.gifts) {
            dispatch(setCartGifts(data.gifts))
        }
        dispatch(setCartAnalysis(data.analysis))
    } catch (e) {
        return e
    }
}