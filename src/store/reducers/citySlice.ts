import {createSlice} from "@reduxjs/toolkit";

interface IInitialState {
    id:number | null,
    name:string,
    office: any,
    offices: any[]
}

const initialState: IInitialState = {
    id: null,
    name:"",
    office:{},
    offices:[]
}

const citySlice = createSlice({
    name: "city",
    initialState: initialState,
    reducers: {
        setCity(state, action: any){
            state.id = action.payload.id
            state.name = action.payload.name
        },
        setOffices(state, action){
            console.log(action.payload);
            state.offices = action.payload
        },
        setOffice(state, action){
            state.office = action.payload
        }
    }
})

export const {setOffices, setOffice, setCity} = citySlice.actions

export default citySlice.reducer
