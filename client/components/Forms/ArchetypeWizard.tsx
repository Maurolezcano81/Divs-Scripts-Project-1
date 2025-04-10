import { ArchetypeQuestion, archetypeWizardType } from "@/schemas/Archetypes.schema";
import { archetypeQuestions } from "@/services/Archetypes.service";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, Title, useTheme } from "react-native-paper";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface ArquetypeWizardProps {
    setActiveWizard: (value: string | null) => void,
    setIsFinish: (value: boolean) => void,
    setArchetypeData: (data: archetypeWizardType) => void;
}

const ArchetypeWizard = ({
    setActiveWizard,
    setArchetypeData,
    setIsFinish
}: ArquetypeWizardProps) => {

    const { colors } = useTheme();

    const [step, setStep] = useState<number>(0);
    const {
        control,
        handleSubmit,
        watch
    } = useForm({
        defaultValues: {
            answers: archetypeQuestions.map((q) => ({
                step: q.step,
                selectedOptionIndex: -1
            }))
        }
    });

    const selectedOptionIndex = watch(`answers.${step}.selectedOptionIndex`);


    const onSubmit = (data: any) => {
        const selected = archetypeQuestions.map((q: ArchetypeQuestion, i: number) => ({
            step: q.step,
            selected: q.options[data.answers[i].selectedOptionIndex]
        }));
        setArchetypeData(selected);
        setActiveWizard(null);
        setIsFinish(true);
    };



    const nextStep = () => {
        if (step < archetypeQuestions.length - 1) setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep((prev) => prev - 1);
    };

    const currentQuestion = archetypeQuestions[step];

    return (
        <Animated.View
            key={step}
            entering={FadeInRight}
            exiting={FadeOutLeft}
            style={styles.stepContainer}
        >
            <Text variant={"headlineMedium"} style={{ color: colors.primary, fontWeight: 800 }}>Tu estilo de personalidad</Text>
            <Title style={styles.title}>Pregunta {step + 1} de {archetypeQuestions.length}</Title>
            <Text style={styles.question}>{currentQuestion.question}</Text>

            <Controller
                control={control}
                name={`answers.${step}.selectedOptionIndex`}
                render={({ field: { onChange, value } }) => (
                    <View>
                        {currentQuestion.options.map((option, idx) => (
                            <Card
                                key={idx}
                                style={[
                                    styles.optionCard,
                                    value === idx && { backgroundColor: colors.primary }
                                ]}
                                onPress={() => onChange(idx)}
                            >
                                <Card.Content>
                                    <Text style={value === idx && { color: colors.onPrimary }}>{option.option_text}</Text>
                                </Card.Content>
                            </Card>
                        ))}
                    </View>
                )}
            />

            <View style={styles.buttonRow}>

                {step > 0 ? (
                    <Button mode="outlined" onPress={prevStep}>
                        Atrás
                    </Button>
                ) : (
                    <Button mode="outlined" onPress={() => setActiveWizard("Temperament")}>
                        Volver
                    </Button>
                )}

                {step < archetypeQuestions.length - 1 ? (
                    <Button mode="contained"
                        disabled={selectedOptionIndex === -1}
                        onPress={nextStep}>
                        Siguiente
                    </Button>
                ) : (
                    <Button mode="contained" onPress={handleSubmit(onSubmit)}>
                        Finalizar
                    </Button>
                )}
            </View>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    stepContainer: {
        gap: 12
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    question: {
        fontSize: 16,
        marginBottom: 10
    },
    optionCard: {
        marginBottom: 8,
        borderWidth: 1,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    }
});

export default ArchetypeWizard;