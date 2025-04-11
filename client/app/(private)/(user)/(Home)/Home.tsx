
import Screen from "@/components/ScreenLayout/Screen";
import useDashboard from "@/hooks/useDashboard";
import useAuthStore from "@/stores/authStore";
import { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { useRouter } from "expo-router";
import EmotionsChart from "@/components/Charts/EmotionsChart";
import Activities from "../Activities";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
    const { user } = useAuthStore();
    const { colors } = useTheme();
    const { getDashboardInfo, loading, response } = useDashboard();

    useEffect(() => {
        getDashboardInfo();
    }, []);

    console.log(response)

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
        <Screen >
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

            <View style={{ marginTop: 24 }}>
            <Text variant="bodyLarge">Ultimas Actividades</Text>

                
                <Activities
                    limit={3}
                />

            </View>

        </Screen>
    );
};

export default Home;
