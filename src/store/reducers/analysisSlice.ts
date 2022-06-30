import {createSlice} from "@reduxjs/toolkit";

interface IInitialState {
    analysis_list: [],
    analysis: any,
}

const initialState: IInitialState = {
    analysis_list:[],
    analysis:{}
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
        }
    }
})

export const {setAnalysisList, setAnalysis} = analysisSlice.actions
export default analysisSlice.reducer
