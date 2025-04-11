
import Screen from "@/components/ScreenLayout/Screen";
import useDashboard from "@/hooks/useDashboard";
import useAuthStore from "@/stores/authStore";
import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import EmotionsChart from "@/components/Charts/EmotionsChart";
import Activities from "../Activities";

const Home = () => {
    const { user } = useAuthStore();
    const { colors } = useTheme();
    const { getDashboardInfo, loading, response } = useDashboard();

    useEffect(() => {
        getDashboardInfo();
    }, []);

    const router = useRouter();

    useEffect(() => {
        if (!user?.active) {
            router.replace("/(private)/Onboarding");
        }
    }, [user?.active]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Screen scrollable={false}>
            <View style={{ marginTop: 8 }}>
                <Text
                    variant="headlineSmall"
                    style={{ color: colors.primary, fontFamily: "Poppins-Bold" }}
                >
                    Hola, {user?.name}
                </Text>
            </View>

            <EmotionsChart
                response={response}
            />

            <View style={{ marginTop: 24, flex: 1 }}>
                <Text variant="bodyLarge">Ultimas Actividades</Text>
                <Activities
                    limit={3}
                />
            </View>
        </Screen>
    );
};

export default Home;
