import {createSlice} from "@reduxjs/toolkit";

interface IInitialState {
    analysis_list: any[],
    analysis: any,
    gifts: any,
    pages:number
}

const initialState: IInitialState = {
    analysis_list: [],
    analysis: {},
    gifts: [],
    pages: 0,
}

const analysisSlice = createSlice({
    name: "analysis",
    initialState: initialState,
    reducers: {
        setAnalysisList(state, action) {
            state.analysis_list = action.payload
        },
        setAnalysis(state, action) {
            state.analysis = action.payload
        },
        setAnalysisGifts(state, action) {
            state.gifts = action.payload
        },
        addAnalysisToList(state, action) {
            state.analysis_list = [...state.analysis_list, ...action.payload]
        },
        setAnalysisPages(state, action) {
            state.pages = action.payload
        },
    }
})

export const {setAnalysisList, setAnalysis, setAnalysisGifts, addAnalysisToList, setAnalysisPages} = analysisSlice.actions
export default analysisSlice.reducer
