import useAuthStore from "@/stores/authStore";
import { Redirect, Slot, Stack } from "expo-router"




const userLayout = () => {
    const { user } = useAuthStore()

    // if (!user) {
    //     return <Redirect href={"/Login"} />
    // }

    return (
        <Slot />
    )
}

export default userLayout;