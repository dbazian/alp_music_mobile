import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import NavigationContainer from "./navigation/NavigationContainer";
import { enableScreens } from "react-native-screens";
import reduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as SplashScreen from "expo-splash-screen";
import filterReducer from "./store/reducers/filterReducer";
import cartReducer from "./store/reducers/cartReducer";
import orderReducer from "./store/reducers/orderReducer";
import playerReducer from "./store/reducers/playerReducer";
import authReducer from "./store/reducers/authReducer";
import licenseReducer from "./store/reducers/licenseReducer";
import favoriteReducer from "./store/reducers/favoriteReducer";

enableScreens();

const rootReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
  order: orderReducer,
  player: playerReducer,
  auth: authReducer,
  license: licenseReducer,
  favorite: favoriteReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareResources = async () => {
      await Font.loadAsync({
        "Raleway-Medium": require("./assets/fonts/Raleway-Medium.ttf"),
        "Raleway-Bold": require("./assets/fonts/Raleway-Bold.ttf"),
        "Raleway-Semibold": require("./assets/fonts/Raleway-SemiBold.ttf"),
      });
      setAppIsReady(true),
        async () => {
          setTimeout(async () => {
            await SplashScreen.hideAsync();
          }, 2000);
        };
    };
    prepareResources();
  });

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

export default App;
