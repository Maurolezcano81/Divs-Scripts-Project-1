import GreenButton from "@/components/Button/GreenButton";
import ArchetypeWizard from "@/components/Forms/ArchetypeWizard";
import TemperamentWizard from "@/components/Forms/TemperamentWizard";
import Screen from "@/components/ScreenLayout/Screen";
import { archetypeWizardType } from "@/schemas/Archetypes.schema";
import { TemperamentWizardType } from "@/schemas/Temper.schema";
import { useState } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const OnBoarding = () => {

    const { colors } = useTheme();

    const [activeWizard, setActiveWizard] = useState<string | null>("Temperament");
    const [temperamentData, setTemperamentData] = useState<TemperamentWizardType | null>(null)
    const [archetypeData, setArchetypeData] = useState<archetypeWizardType | null>(null)
    const [isFinished, setIsFinished] = useState<boolean>(false);

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

    const submitData = () => {
        console.log(temperamentData);
        console.log(archetypeData);

        const data = {
            temperamentScore: getCounts(temperamentData),
            archetypeScore: getCounts(archetypeData)
        }

        console.log(data);
    }

    return (
        <Screen>

            <View>
                <Text variant="headlineMedium" style={{ color: colors.primary, fontFamily: "Poppins-Bold" }}>
                    ¡Ya casi terminamos!
                </Text>

                <Text variant="bodyLarge">
                    Necesitamos algunos datos adicionales para adaptar las respuestas a tus preferencias y brindarte una experiencia personalizada. <Text className="!font-bold">No te preocupes, toda la información es privada y no será publicada en ningún lado.</Text>
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
                        <View className="gap-4">
                            <GreenButton
                                mode="outlined"
                                onPress={() => {
                                    setActiveWizard("Archetype")
                                    setIsFinished(false)
                                }}>Volver</GreenButton>
                            <GreenButton onPress={submitData}>Enviar Respuestas</GreenButton>
                        </View>

                    </View>
                )}
            </View>

        </Screen>
    )
}

export default OnBoarding;
