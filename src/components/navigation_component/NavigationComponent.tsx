import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "../../screens/Landing";
import NotFound from "../../screens/404";

const NavigationComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Landing/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default NavigationComponent;
