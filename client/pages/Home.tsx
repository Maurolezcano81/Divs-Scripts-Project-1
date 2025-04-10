
import Screen from "@/components/ScreenLayout/Screen";
import useDashboard from "@/hooks/useDashboard";
import useAuthStore from "@/stores/authStore";
import { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";

const Home = () => {
    const { user } = useAuthStore();
    const { colors } = useTheme();
    const { getDashboardInfo, loading, error, success, response } = useDashboard();
    const { width } = useWindowDimensions();

    useEffect(() => {
        getDashboardInfo();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <Screen>
            <View style={{ marginTop: 8 }}>
                <Text
                    variant="headlineSmall"
                    style={{ color: colors.primary, fontFamily: "Poppins-Bold" }}
                >
                    Hola, {user?.name}
                </Text>
            </View>

            <View
                className=""
            >
                <Text>Tu estado emocional los ultimos 7 dias</Text>

                {response?.emotionsSummary && (
                    <View
                        style={{
                            paddingHorizontal: 16,
                            marginTop: 24,
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <LineChart
                            data={{
                                labels: response.last7Days.map(date => date.slice(5)), // muestra "MM-DD"
                                datasets: [
                                    {
                                        data: response.last7Days.map(date => {
                                            const day = response.emotionsSummary.find(d => d.date === date);
                                            return day?.moodAverages["happy"] ?? 0;
                                        }),
                                    },
                                ],
                            }}
                            width={width - 32} // se ajusta al ancho menos padding
                            height={220}
                            yAxisLabel=""
                            chartConfig={{
                                backgroundGradientFrom: "#ffffff",
                                backgroundGradientTo: "#ffffff",
                                color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                decimalPlaces: 1,
                                propsForDots: {
                                    r: "5",
                                    strokeWidth: "2",
                                    stroke: "#6200ee",
                                },
                            }}
                            bezier
                            style={{ borderRadius: 12 }}
                        />
                    </View>
                )}
            </View>

        </Screen>
    );
};

export default Home;
