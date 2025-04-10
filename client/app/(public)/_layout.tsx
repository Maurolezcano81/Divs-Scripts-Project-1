import useAuthStore from "@/stores/authStore"
import { Redirect, Slot, Stack } from "expo-router"



const publicLayout = () => {

    const { user } = useAuthStore();

    if (user) {
        return <Redirect href={'/(private)/(user)/(Home)/(tabs)/index'} />
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        />
    )
}

export default publicLayout