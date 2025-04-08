import { ReactNode } from "react"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import { useTheme } from "react-native-paper";
import { ScrollView } from "react-native";

interface ScreenProps {
    className?: string;
    children: ReactNode;
}

const Screen = ({
    className = "p-6",
    children
}: ScreenProps) => {

    const { colors } = useTheme();

    return (
        <SafeAreaProvider>
            <SafeAreaView className={`flex-1 min-h-screen p-6 ${className}`} style={{ backgroundColor: colors.surface }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Screen;