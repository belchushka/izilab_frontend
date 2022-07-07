import {AppDispatch, AppThunkAction} from "../types";
import {$host} from "../../http";
import {
    setCart,
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

        const new_cart = {
            price_with_stock:data.price_with_stock,
            price: data.total_price,
            sempling_price:data.sempling_price,
            semple_preparation_price:data.semple_preparation_price,

        }
        dispatch(setCart(new_cart))
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
        const new_cart = {
            price: data.total_price,
            analysis: data.analysis,
            semplings: data.semplings,
            price_with_stock:data.price_with_stock,
            sempling_price:data.sempling_price,
            semple_preparation_price:data.semple_preparation_price,
            semple_preparations: data.semple_preparations,
            not_performed_ids: data.not_performed_ids,
            can_continue: data.can_continue,
            alerts: data.alerts,
            piece_alerts: data.piece_alerts
        }

        dispatch(setCart(new_cart))
        dispatch(setAnalysisGifts( data.gifts))
        // dispatch(setCartPrice(data.total_price))
        // if (data.gifts) {
        //     dispatch(setAnalysisGifts(data.gifts))
        // }
        // dispatch(setCartAnalysis(data.analysis))
        // dispatch(setCartSemplings(data.semplings))
        // dispatch(setCartSemplingPrice(data.sempling_price))
        // dispatch(setCartPriceWithStock(data.price_with_stock))
    } catch (e) {
        return e
    }
}