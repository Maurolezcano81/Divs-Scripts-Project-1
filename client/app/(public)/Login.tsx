import useAuthStore from "@/stores/authStore"
import { View } from "react-native"
import { Button, Text, useTheme } from "react-native-paper"

const Login = () => {

    const { login } = useAuthStore();
    const { colors } = useTheme();

    const test = () => {
        login();
    }


    return (
        <View>
            <Text variant="headlineLarge" style={{ color: colors.primary, fontWeight: 800 }}>Sign In</Text>
            <Button onPress={() => test()}> Prueba </Button>
        </View>
    )
}

export default Login;