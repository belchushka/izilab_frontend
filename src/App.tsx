import React, {useState} from 'react';
import './styles/global.scss';
import {Provider} from "react-redux";
import store from "./store";
import {AuthContext} from "./contexts/AuthContext";

function App() {
  const [auth, setAuth] = useState(false)

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{auth,setAuth}}>

      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
