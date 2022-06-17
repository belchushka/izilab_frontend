import React from "react";

export interface IAuthContextState {
    auth:boolean,
    setAuth:(auth:boolean)=>void
}

export const AuthContext =  React.createContext<IAuthContextState>({
    auth:false,
    setAuth:(auth)=>{}
})
