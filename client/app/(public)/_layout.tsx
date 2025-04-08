import useAuthStore from "@/stores/authStore"
import { Redirect, Slot, Stack } from "expo-router"



const publicLayout = () => {

    const { user } = useAuthStore();

    if (user) {
        return <Redirect href={'/Home'} />
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