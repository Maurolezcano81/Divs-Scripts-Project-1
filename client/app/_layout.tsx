import { Slot } from "expo-router";

import { PaperProvider } from 'react-native-paper';
import { CustomDarkTheme, CustomLightTheme } from "@/assets/themes/themes";
import '../global.css'

export default function RootLayout() {

  // const colorScheme = useColorScheme(); // para detectar dark o light mode

  let colorScheme = 'light';

  const theme = colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  return (
    <PaperProvider theme={theme} >
      <Slot />
    </PaperProvider>
  )
}
