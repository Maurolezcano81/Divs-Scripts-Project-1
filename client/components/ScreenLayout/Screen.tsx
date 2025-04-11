import React, { ReactNode } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface ScreenProps {
  className?: string;
  children: ReactNode;
  scrollable?: boolean;
}

const Screen = ({ className = "p-6", children, scrollable = true }: ScreenProps) => {
  const { colors } = useTheme();

  const Container = scrollable ? ScrollView : React.Fragment;

  return (
    <SafeAreaProvider>
      <SafeAreaView className={`flex-1 ${className}`} style={{ backgroundColor: colors.surface }}>
        <Container {...(scrollable ? { showsVerticalScrollIndicator: false } : {})}>
          {children}
        </Container>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Screen