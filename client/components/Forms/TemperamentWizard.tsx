import { TemperamentQuestion, TemperamentWizardType } from "@/schemas/Temper.schema";
import { temperamentQuestions } from "@/services/Temper.service";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, Title, useTheme } from "react-native-paper";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";


interface TemperamentWizardProps {
    setActiveWizard: (value: string) => void,
    setTemperamentData: (data: TemperamentWizardType) => void;
}

const TemperamentWizard = ({
    setActiveWizard,
    setTemperamentData
}: TemperamentWizardProps) => {

    const { colors } = useTheme();

    const [step, setStep] = useState<number>(0);
    const {
        control,
        handleSubmit,
        watch
    } = useForm({
        defaultValues: {
            answers: temperamentQuestions.map((q: TemperamentQuestion) => ({
                step: q.step,
                selectedOptionIndex: -1
            }))
        }
    });

    const selectedOptionIndex = watch(`answers.${step}.selectedOptionIndex`);


    const onSubmit = (data: any) => {
        const selected = temperamentQuestions.map((q: TemperamentQuestion, i: number) => ({
            step: q.step,
            selected: q.options[data.answers[i].selectedOptionIndex]
        }));
        setTemperamentData(selected)
        setActiveWizard("Archetype")
    };

    const nextStep = () => {
        if (step < temperamentQuestions.length - 1) setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep((prev) => prev - 1);
    };

    const currentQuestion = temperamentQuestions[step];

    return (
        <Animated.View
            key={step}
            entering={FadeInRight}
            exiting={FadeOutLeft}
            style={styles.stepContainer}
        >
            <Text variant={"headlineMedium"} style={{ color: colors.primary, fontWeight: 800 }}>Perfil Emocional</Text>
            <Title style={styles.title}>Pregunta {step + 1} de {temperamentQuestions.length}</Title>
            <Text style={styles.question}>{currentQuestion.question}</Text>

            <Controller
                control={control}
                name={`answers.${step}.selectedOptionIndex`}
                render={({ field: { onChange, value } }) => (
                    <View>
                        {currentQuestion.options.map((option: any, idx: number) => (
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
                {step > 0 && (
                    <Button mode="outlined" onPress={prevStep}>
                        Atrás
                    </Button>
                )}
                {step < temperamentQuestions.length - 1 ? (
                    <Button
                        mode="contained"
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

export default TemperamentWizard;