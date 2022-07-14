import {AppThunkAction} from "../types";
import {Dispatch} from "redux";
import {$host} from "../../http";
import {addAnalysisToList, setAnalysisList, setAnalysisPages, setAnalysisTotal} from "../reducers/analysisSlice";

export const loadMore: AppThunkAction = (category, page) => async (dispatch: Dispatch) => {
    try {
        const data = await $host.get("/analysis/get_from_category", {
            params: {
                category: category,
                page: page
            }
        })
        dispatch(addAnalysisToList(data.data.analysis))
        dispatch(setAnalysisPages(data.data.pages))
    } catch (e: any) {
        if (e.response.status == 404) {
            dispatch(setAnalysisList([]))
        } else {
            alert("Технические шоколадки ")
        }
    }
}

export const getCategoryAnalysis: AppThunkAction = (category) => async (dispatch: Dispatch) => {
    try {
        const data = await $host.get("/analysis/get_from_category", {
            params: {
                category: category,
                page:0
            }
        })
        dispatch(setAnalysisList(data.data.analysis))
        dispatch(setAnalysisPages(data.data.pages))
    } catch (e: any) {
        if (e.response.status == 404) {
            dispatch(setAnalysisList([]))
        } else {
            alert("Технические шоколадки ")
        }
    }
}

export const searchAnalysis: AppThunkAction = (query, page) => async (dispatch: Dispatch) => {
    try {
        const data = await $host.get("/analysis/get_from_query", {
            params: {
                query,
                page
            }
        })
        dispatch(setAnalysisList(data.data.analysis))
        dispatch(setAnalysisPages(data.data.pages))
        dispatch(setAnalysisTotal(data.data.total))
    } catch (e: any) {
        dispatch(setAnalysisList([]))
    }
}

export const loadMoreSearch: AppThunkAction = (query, page) => async (dispatch: Dispatch) => {
    try {
        const data = await $host.get("/analysis/get_from_query", {
            params: {
                query,
                page
            }
        })
        dispatch(addAnalysisToList(data.data.analysis))
        dispatch(setAnalysisPages(data.data.pages))
    } catch (e: any) {
        dispatch(setAnalysisList([]))
    }
}
