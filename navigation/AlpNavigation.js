import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SongScreen from "../src/screens/SongScreen";
import SearchScreen from "../src/screens/SearchScreen";
import CartScreen from "../src/screens/CartScreen";
import UserScreen from "../src/screens/UserScreen";
import AuthScreen from "../src/screens/AuthScreen";
import StartupScreen from "../src/screens/StartupScreen";
import PaymentScreen from "../src/screens/PaymentScreen";
import OrderScreen from "../src/screens/OrderScreen";
import LicenseScreen from "../src/screens/LicenseScreen";
import FavoriteScreen from "../src/screens/FavoriteScreen";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser, faSearch } from "@fortawesome/pro-light-svg-icons";
import CustomHeaderButton from "../src/components/Interactive/CustomHeaderButton";
import Colors from "../constants/Colors";

const SearchNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Songs: SongScreen,
    License: LicenseScreen,
    Favorite: FavoriteScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: "white",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Favorite" iconName="ios-star" />
        </HeaderButtons>
      ),
    },
    headerBackStyle: {
      fontFamily: "Raleway-Medium",
    },
  }
);

const CartNavigator = createStackNavigator(
  {
    Cart: CartScreen,
    Payment: PaymentScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: "white",
    },
    headerBackStyle: {
      fontFamily: "Raleway-Medium",
    },
  }
);

const UserNavigator = createStackNavigator(
  {
    User: UserScreen,
    Orders: OrderScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: "white",
    },
  }
);

const AlpTabNavigator = createBottomTabNavigator(
  {
    User: {
      screen: UserNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <FontAwesomeIcon
              icon={faUser}
              size={20}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <FontAwesomeIcon
              icon={faSearch}
              size={20}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },

    Cart: {
      screen: CartNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <FontAwesomeIcon
              icon={faShoppingCart}
              size={20}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: "black",
      style: { backgroundColor: "white" },
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: {
      header: () => false,
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Tab: AlpTabNavigator,
});

export default createAppContainer(MainNavigator);
