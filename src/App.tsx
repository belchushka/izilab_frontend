import React, {useEffect, useState} from 'react';
import './styles/global.scss';
import {Provider} from "react-redux";
import store from "./store";
import {AuthContext} from "./contexts/AuthContext";
import NavigationComponent from "./components/navigation_component/NavigationComponent";
import {setCurrentCity} from "./store/actions/cityActions";

function App() {
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        let user_city: string | null= localStorage.getItem("user_city")
        if (user_city !== null) {
            user_city = JSON.parse(user_city)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            store.dispatch(setCurrentCity(user_city))
        }
    }, [])

    return (
        <Provider store={store}>
            <AuthContext.Provider value={{auth, setAuth}}>
                <NavigationComponent/>
            </AuthContext.Provider>
        </Provider>
    );
}

export default App;
