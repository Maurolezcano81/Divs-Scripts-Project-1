import useAuthStore from "@/stores/authStore";
import { Redirect } from "expo-router";
import { View } from "react-native"
import { Button, Text } from "react-native-paper"


const Home = () => {
    const { clearSession, user } = useAuthStore();

    const test = () => {
        clearSession();
    }

    return (
        <View>
            <Text>Hola Dashboard</Text>
            <Button onPress={() => test()}> Prueba </Button>
        </View>
    )
}

export default Home