import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SongScreen from "../src/screens/SongScreen";
import SearchScreen from "../src/screens/SearchScreen";
import CartScreen from "../src/screens/CartScreen";
import ContactScreen from "../src/screens/ContactScreen";
import UserScreen from "../src/screens/UserScreen";
import AuthScreen from "../src/screens/AuthScreen";
import SignupScreen from "../src/screens/SignupScreen";
import StartupScreen from "../src/screens/StartupScreen";
import OrderScreen from "../src/screens/OrderScreen";
import CreditScreen from "../src/screens/CreditScreen";
import FavoriteScreen from "../src/screens/FavoriteScreen";
import AboutScreen from "../src/screens/AboutScreen";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser, faSearch } from "@fortawesome/pro-light-svg-icons";
import CustomHeaderButton from "./navComponents/CustomHeaderButton";
import HeaderLogo from "./navComponents/HeaderLogo";
import UserHeader from "./navComponents/UserHeader";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const UserNavigator = createStackNavigator(
  {
    User: UserScreen,
    Orders: OrderScreen,
    Credits: CreditScreen,
    Contact: ContactScreen,
    About: AboutScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "transparent",
        shadowColor: "transparent",
        height: hp("12%"),
      },
      headerBackground: () => (
        <LinearGradient colors={["black", "#00202a"]} style={{ flex: 1 }} />
      ),
      headerTintColor: Colors.primary,
      title: <UserHeader />,
      headerBackTitle: "Back",
      headerBackTitleStyle: {
        fontSize: hp("2.5%"),
        fontFamily: "Raleway-Medium",
      },
      headerMode: "float",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Favorite" iconName="ios-star" />
        </HeaderButtons>
      ),
      headerTitleStyle: { alignSelf: "center" },
      headerTitleContainerStyle: {
        left: 0,
        right: 0,
        alignItems: "center",
      },
    },
  }
);

const SearchNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Songs: SongScreen,
    Favorite: FavoriteScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "transparent",
        shadowColor: "transparent",
        height: hp("12%"),
      },
      headerBackground: () => (
        <LinearGradient colors={["black", "#00202a"]} style={{ flex: 1 }} />
      ),
      headerTintColor: Colors.primary,
      headerTitleContainerStyle: {
        left: 0,
        right: 0,
        alignItems: "center",
      },
      headerTitle: () => <HeaderLogo />,
      headerBackTitle: "Back",
      headerBackTitleStyle: {
        fontSize: hp("2.5%"),
        fontFamily: "Raleway-Medium",
      },
      headerMode: "float",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Favorite" iconName="ios-star" />
        </HeaderButtons>
      ),
    },
  }
);

const CartNavigator = createStackNavigator(
  {
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "transparent",
        shadowColor: "transparent",
        height: hp("12%"),
      },
      headerBackground: () => (
        <LinearGradient colors={["black", "#00202a"]} style={{ flex: 1 }} />
      ),
      headerTitleContainerStyle: {
        left: 0,
        right: 0,
        alignItems: "center",
      },
      headerTintColor: Colors.primary,
      headerTitle: () => <HeaderLogo />,
      headerBackTitle: "Back",
      headerBackTitleStyle: {
        fontSize: hp("2.5%"),
        fontFamily: "Raleway-Medium",
      },
      headerMode: "float",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Favorite" iconName="ios-star" />
        </HeaderButtons>
      ),
    },
  }
);

const AlpTabNavigator = createBottomTabNavigator(
  {
    User: {
      screen: UserNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <FontAwesomeIcon
              icon={faUser}
              size={hp("2%")}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <FontAwesomeIcon
              icon={faSearch}
              size={hp("2%")}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },

    Cart: {
      screen: CartNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <FontAwesomeIcon
              icon={faShoppingCart}
              size={hp("2%")}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: hp("1.5%"),
        fontFamily: "Raleway-Medium",
      },
      activeTintColor: Colors.primary,
      inactiveTintColor: "black",
      style: { backgroundColor: "white", height: hp("6%") },
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    Signup: SignupScreen,
  },
  {
    defaultNavigationOptions: {
      header: () => false,
    },
    mode: "modal",
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Tab: AlpTabNavigator,
});

export default createAppContainer(MainNavigator);
