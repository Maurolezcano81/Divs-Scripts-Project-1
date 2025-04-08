import { ReactNode } from "react"
import { SafeAreaView } from "react-native"
import { useTheme } from "react-native-paper";

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
        <SafeAreaView className={`min-h-screen p-6 ${className}`} style={{ backgroundColor: colors.surface }}>
            {children}
        </SafeAreaView>
    )
}

export default Screen;