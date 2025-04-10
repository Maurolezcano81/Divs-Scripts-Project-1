import { Slot } from "expo-router";
import { StatusBar } from 'expo-status-bar';

import { PaperProvider } from 'react-native-paper';
import { CustomDarkTheme, CustomLightTheme } from "@/assets/themes/themes";
import '../global.css'

export default function RootLayout() {

  // const colorScheme = useColorScheme(); // para detectar dark o light mode

  let colorScheme = 'ligth';

  const theme = colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  return (
    <PaperProvider theme={theme} >
      <StatusBar style={theme.dark ? "light" : "dark"} backgroundColor={theme.colors.surface} translucent={false} />

      <Slot />
    </PaperProvider>
  )
}
