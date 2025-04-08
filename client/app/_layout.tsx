import { Stack } from "expo-router";

import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { CustomDarkTheme, CustomLightTheme } from "@/assets/themes/themes";
import useAuthStore from "@/stores/authStore";


export default function RootLayout() {

  // const colorScheme = useColorScheme(); // para detectar dark o light mode

  let colorScheme = 'light';

  const theme = colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  return (
    <PaperProvider theme={theme} >
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </PaperProvider>
  )
}
