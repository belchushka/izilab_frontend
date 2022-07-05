import {AppThunkAction} from "../types";
import {Dispatch} from "redux";
import {$host} from "../../http";
import {setAnalysisList} from "../reducers/analysisSlice";

export const getCategoryAnalysis: AppThunkAction = (params) => async (dispatch: Dispatch) => {
    try {
        const data = await $host.get("/analysis/get_from_category", {
            params: {
                category: params
            }
        })
        dispatch(setAnalysisList(data.data))
    } catch (e: any) {
        if (e.response.status == 404) {
            dispatch(setAnalysisList([]))
        } else {
            alert("Технические шоколадки ")
        }
    }
}

export const searchAnalysis: AppThunkAction = (query) => async (dispatch: Dispatch) => {
    try {
        const data = await $host.get("/analysis/get_from_query", {
            params: {
                query
            }
        })
        dispatch(setAnalysisList(data.data))
    } catch (e: any) {
        dispatch(setAnalysisList([]))
    }
}
