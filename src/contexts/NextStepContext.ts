import React from "react";


export default React.createContext({
    nextStep: ()=>"",
    prevStep: ()=>"",
    setStep: (num: number)=>""
}
)