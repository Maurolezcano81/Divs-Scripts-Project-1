import useDashboard from "@/hooks/useDashboard";
import { useWindowDimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Text, useTheme } from "react-native-paper";


const EmotionsChart = ({
    response
}: { response: any }) => {
    const { colors } = useTheme();

    const { width } = useWindowDimensions();

    return (
        <View
            className="mt-12"
        >
            <Text variant="bodyLarge">Tu estado emocional los ultimos 7 dias</Text>
            {response?.emotionsSummary && (
                <View
                    style={{
                        paddingHorizontal: 16,
                        marginTop: 2,
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
                            backgroundGradientFrom: colors.background,
                            backgroundGradientTo: colors.background,
                            color: (() => colors.outlineVariant),
                            labelColor: (() => colors.onSurface),
                            decimalPlaces: 1,
                            propsForDots: {
                                r: "5",
                                strokeWidth: "1",
                                fill: colors.primary,
                                stroke: colors.primary,
                            },
                        }}
                        bezier
                        style={{ borderRadius: 12 }}
                    />
                </View>
            )}
        </View>
    )
}

export default EmotionsChart;