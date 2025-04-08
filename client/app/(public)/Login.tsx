import StarSVG from "@/components/svgs/StarSVG";
import useAuthStore from "@/stores/authStore"
import { SafeAreaView, View } from "react-native"
import { Button, Text, useTheme } from "react-native-paper"
import '../../global.css';
const Login = () => {

    const { login } = useAuthStore();
    const { colors } = useTheme();

    const test = () => {
        login();
    }

    return (
        <SafeAreaView>
            <View className="">
                <Text className="">
                    asd
                </Text>
                <StarSVG />
            </View>
            <Text variant="headlineLarge" style={{ color: colors.primary, fontWeight: 800 }}>Sign In</Text>
            <Button onPress={() => test()}> Prueba </Button>
        </SafeAreaView>
    )
}

export default Login;