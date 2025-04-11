import { Slot } from "expo-router";
import { StatusBar } from 'expo-status-bar';

import { PaperProvider } from 'react-native-paper';
import { CustomDarkTheme, CustomLightTheme } from "@/assets/themes/themes";
import '../global.css'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useAuthStore from "@/stores/authStore";

export default function RootLayout() {

  // const colorScheme = useColorScheme(); // para detectar dark o light mode


  const { dark } = useAuthStore()

  const color = dark ? CustomDarkTheme : CustomLightTheme;

  return (
    <GestureHandlerRootView>
      <PaperProvider theme={color} >
        <StatusBar style={color.dark ? "light" : "dark"} backgroundColor={color.colors.surface} translucent={false} />

        <Slot />
      </PaperProvider>
    </GestureHandlerRootView>
  )
}
