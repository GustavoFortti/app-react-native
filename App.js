import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Details, NewSearch, Home, Products, Splash, NewHome } from "./screens"
import { useCallback } from "react";
import BottomTabNavigation from "./navigations/BottomTabNavigation";

const Stack = createNativeStackNavigator()

export default function App() {

  const [fontsLoaded] = useFonts({
    black: require("./assets/fonts/Inter-Black.ttf"),
    bold: require("./assets/fonts/Inter-Bold.ttf"),
    regular: require("./assets/fonts/Inter-Regular.ttf"),
    medium: require("./assets/fonts/Inter-Medium.ttf"),
    orbitron_medium: require("./assets/fonts/Orbitron-Medium.ttf"),
    orbitron_regular: require("./assets/fonts/Orbitron-Regular.ttf"),
    orbitron_semibold: require("./assets/fonts/Orbitron-SemiBold.ttf"),
    eurostile: require("./assets/fonts/Eurostile.ttf")
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName="BottomTabNavigation"
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
      >
        {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ 
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="NewHome"
          component={NewHome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewSearch"
          component={NewSearch}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Products"
          component={Products}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
          options={{
            headerShown: false,
            animationEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}