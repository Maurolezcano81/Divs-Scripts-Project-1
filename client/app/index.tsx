import useAuthStore from "@/stores/authStore";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const { user } = useAuthStore();

  const [loaded, error] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (user) {
    return <Redirect href={"/(private)/(user)/(Home)/(Main)/(tabs)/index"} />
  } else {
    return <Redirect href={"/Login"} />
  }
  
}
