import React, {useEffect, useRef, useState} from 'react';
import './styles/global.scss';
import {Provider} from "react-redux";
import store from "./store";
import {AuthContext} from "./contexts/AuthContext";
import NavigationComponent from "./components/navigation_component/NavigationComponent";
import {setCurrentCity} from "./store/actions/cityActions";
import {setCart} from "./store/reducers/userSlice";
// import ScreamerComponent from "./components/ScreamerComponent";
// import Screamer from "./assets/Screamer.mp3"

function App() {
    const [auth, setAuth] = useState(false)
    // const [clicksRegistered, setClicksRegistered] = useState(0)
    // const audio: any = useRef(null)
    // const [showScreamer, setShowScreamer] = useState(false)
    useEffect(() => {
        let user_city: string | null = localStorage.getItem("user_city")
        if (user_city !== null) {
            user_city = JSON.parse(user_city)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            store.dispatch(setCurrentCity(user_city))
        }
        const cart = localStorage.getItem("user_cart")
        if (cart) {
            store.dispatch(setCart({
                ids: JSON.parse(cart)
            }))
        }
    }, [])

    // useEffect(() => {
    //     if (clicksRegistered == 8) {
    //         audio.current.play()
    //         setShowScreamer(true)
    //         localStorage.setItem("screamer_shown","true")
    //     }
    // }, [clicksRegistered])
    // useEffect(() => {
    //     const screamer_shown = localStorage.getItem("screamer_shown")
    //     const callback = (ev: MouseEvent) => {
    //         setClicksRegistered(state => state + 1)
    //         console.log("click");
    //     }
    //     if (!screamer_shown || screamer_shown=="false") {
    //         window.addEventListener("click", callback,{
    //             capture:true
    //         })
    //         audio.current = new Audio(Screamer)
    //         audio.current.preload = true
    //     }
    //     return () => {
    //         window.removeEventListener("click", callback, )
    //
    //     }
    // }, [])
    return (
        <Provider store={store}>
            <AuthContext.Provider value={{auth, setAuth}}>
                {/*{!showScreamer ? */}
                <NavigationComponent/>
                {/*//     :*/}
                {/*//     <ScreamerComponent/>*/}
                {/*// }*/}
            </AuthContext.Provider>
        </Provider>
    );
}

export default App;
