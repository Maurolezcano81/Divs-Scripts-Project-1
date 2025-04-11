import GreenButton from "@/components/Button/GreenButton";
import ArchetypeWizard from "@/components/Forms/ArchetypeWizard";
import TemperamentWizard from "@/components/Forms/TemperamentWizard";
import Screen from "@/components/ScreenLayout/Screen";
import useOnboarding, { dataToFetchOnboarding } from "@/hooks/useOnboarding";
import { archetypeWizardType } from "@/schemas/Archetypes.schema";
import { TemperamentWizardType } from "@/schemas/Temper.schema";
import useAuthStore from "@/stores/authStore";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, HelperText, Text, useTheme } from "react-native-paper";

const OnBoarding = () => {

    const { colors } = useTheme();
    const { user } = useAuthStore();
    const { registerOnboarding, loading, error, success, response } = useOnboarding();

    const [activeWizard, setActiveWizard] = useState<string | null>("Temperament");
    const [temperamentData, setTemperamentData] = useState<TemperamentWizardType | null>(null)
    const [archetypeData, setArchetypeData] = useState<archetypeWizardType | null>(null)
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (user?.active) {
            router.replace("/(private)/(user)/(Home)/Home");
        }
    }, [user?.active]);



    const getCounts = (data: any) => {
        const counts: Record<string, number> = {};

        if (data) {
            data.forEach((item: any) => {
                const selectedOption = item.selected;
                if (selectedOption && selectedOption.option_type) {
                    selectedOption.option_type.forEach((type: string) => {
                        counts[type] = (counts[type] || 0) + 1;
                    });
                }
            });
        }

        return counts;
    };


    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setShouldRedirect(true);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [success]);


    const submitData = () => {
        const data: dataToFetchOnboarding = {
            temperamentScore: getCounts(temperamentData),
            archetypeScore: getCounts(archetypeData)
        }

        registerOnboarding(data)
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    
    if (shouldRedirect) {
        return <Redirect href="/(private)/(user)/(Home)/Home" />;
    }

    return (
        <Screen>

            <View>
                <Text variant="headlineMedium" style={{ color: colors.primary, fontFamily: "Poppins-Bold" }}>
                    ¡Ya casi terminamos!
                </Text>

                <Text variant="bodyLarge">
                    Hola {user?.name} Necesitamos algunos datos adicionales para adaptar las respuestas a tus preferencias y brindarte una experiencia personalizada. <Text className="!font-bold">No te preocupes, toda la información es privada y no será publicada en ningún lado.</Text>
                </Text>
            </View>

            <View className="mt-16">

                {activeWizard && activeWizard === "Temperament" && (
                    <TemperamentWizard
                        setActiveWizard={setActiveWizard}
                        setTemperamentData={setTemperamentData}
                    />
                )}

                {activeWizard && activeWizard === "Archetype" && (
                    <ArchetypeWizard
                        setActiveWizard={setActiveWizard}
                        setArchetypeData={setArchetypeData}
                        setIsFinish={setIsFinished}
                    />
                )}


                {isFinished && (
                    <View>
                        <Text className="mb-12" variant="titleLarge" style={{ textAlign: "center", fontFamily: "Poppins-Bold" }}>Muchas gracias, por responder.</Text>

                        {error && error.length > 0 && (
                            <HelperText type="error">{error}</HelperText>
                        )}

                        <View className="gap-4">
                            <GreenButton
                                mode="outlined"
                                onPress={() => {
                                    setActiveWizard("Archetype")
                                    setIsFinished(false)
                                }}>Volver</GreenButton>
                            <GreenButton
                                onPress={submitData}
                                loading={loading}
                                disabled={loading}
                            >Enviar Respuestas</GreenButton>
                        </View>

                    </View>
                )}
            </View>

        </Screen>
    )
}

export default OnBoarding;
