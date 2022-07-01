import {createSlice} from "@reduxjs/toolkit";

interface IInitialState {
    analysis_list: [],
    analysis: any,
    gifts: any
}

const initialState: IInitialState = {
    analysis_list:[],
    analysis:{},
    gifts:[],
}

const analysisSlice = createSlice({
    name: "analysis",
    initialState: initialState,
    reducers: {
        setAnalysisList(state, action){
            state.analysis_list = action.payload
        },
        setAnalysis(state, action){
            state.analysis = action.payload
        },
        setAnalysisGifts(state, action){
            state.gifts = action.payload
        }
    }
})

export const {setAnalysisList, setAnalysis, setAnalysisGifts} = analysisSlice.actions
export default analysisSlice.reducer
