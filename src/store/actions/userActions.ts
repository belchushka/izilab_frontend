import {AppDispatch, AppThunkAction} from "../types";
import {$host} from "../../http";
import {
    setCartAnalysis,
    setCartPrice, setCartPriceWithStock,
    setCartSemplingPrice,
    setCartSemplings
} from "../reducers/userSlice";
import {setAnalysisGifts} from "../reducers/analysisSlice";


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
        const {data}: any = await $host.post("analysis/count_cart_price_without_data", {
            cart: cart
        })
        dispatch(setCartPrice(data.total_price))
        dispatch(setCartSemplingPrice(data.sempling_price))
        dispatch(setCartPriceWithStock(data.price_with_stock))
    } catch (e) {
        return e
    }
}

export const countCartPrice: AppThunkAction = (cart, officeId, date) => async (dispatch: AppDispatch) => {
    try {
        const {data}: any = await $host.post("analysis/count_cart_price", {
            cart: cart,
            officeId,
            date
        })
        dispatch(setCartPrice(data.total_price))
        if (data.gifts) {
            dispatch(setAnalysisGifts(data.gifts))
        }
        dispatch(setCartAnalysis(data.analysis))
        dispatch(setCartSemplings(data.semplings))
        dispatch(setCartSemplingPrice(data.sempling_price))
        dispatch(setCartPriceWithStock(data.price_with_stock))
    } catch (e) {
        return e
    }
}