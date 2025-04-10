import Screen from "@/components/ScreenLayout/Screen";
import useAuthStore from "@/stores/authStore";
import { Redirect } from "expo-router";
import { View } from "react-native"
import { Button, Text, useTheme } from "react-native-paper"


const Home = () => {
    const { clearSession, user } = useAuthStore();
    const { colors } = useTheme();
    
    const test = () => {
        clearSession();
    }

    return (
        <Screen>
            <View>
                <Text variant="headlineSmall" style={{ color: colors.primary, fontFamily: "Poppins-Bold" }}>
                    Iniciar Sesión
                </Text>
            </View>
            <Button onPress={() => test()}> Prueba </Button>
        </Screen>
    )
}

export default Home