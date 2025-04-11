import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import GreenButton from "../Button/GreenButton";
import { useState } from "react";
import { Portal, Dialog, Button, useTheme, } from "react-native-paper";
import LabelInput from "../Input/LabelInput";

export type AnotationFormData = {
    title: string;
    content: string;
    is_completed: boolean;
    dueDate: Date;
};

const ModalCreate = ({
    createAnotations
}: { createAnotations: any }) => {
    const { colors } = useTheme();
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<AnotationFormData>({
        defaultValues: {
            title: "",
            content: "",
        },
        mode: "onTouched",
    });


    const onSubmit = (data: any) => {


        const payload = {
            title: data.title,
            content: data.content,
            status: "pendiente",
            dueDate: new Date().toISOString()
        };

        createAnotations(payload);
        setIsDialogVisible(false);
        reset();
    };

    return (
        <View>
            <GreenButton icon="plus" onPress={() => setIsDialogVisible(true)}>
                Agregar Nota
            </GreenButton>

            {isDialogVisible && (

                <Portal>
                    <Dialog visible={isDialogVisible} onDismiss={() => {
                        setIsDialogVisible(false);
                        reset();
                    }}
                        style={{ backgroundColor: colors.background }}
                    >
                        <Dialog.Title>Crear Nota</Dialog.Title>
                        <Dialog.Content>
                            <View style={{ padding: 16, gap: 12 }}>
                                <Controller
                                    control={control}
                                    name="title"
                                    rules={{ required: "El título es obligatorio" }}
                                    render={({ field: { onChange, value } }) => (
                                        <LabelInput
                                            placeholder="Titulo de la anotación"
                                            label="Titulo"
                                            inputProps={{
                                                mode: "outlined",
                                                error: !!errors.title?.message,
                                                onChangeText: onChange,
                                                value,
                                            }}
                                            errorMessage={errors.title?.message!}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="content"
                                    rules={{ required: "La descripción es obligatoria" }}
                                    render={({ field: { onChange, value } }) => (
                                        <LabelInput
                                            placeholder="Descripción de la anotación"
                                            label="Descripción"
                                            inputProps={{
                                                mode: "outlined",
                                                error: !!errors.content?.message,
                                                onChangeText: onChange,
                                                value,
                                            }}
                                            errorMessage={errors.content?.message!}
                                        />
                                    )}
                                />
                            </View>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => {
                                setIsDialogVisible(false);
                                reset();
                            }}>Cancelar</Button>
                            <Button onPress={handleSubmit(onSubmit)}>Enviar</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            )}

        </View>
    );
};

export default ModalCreate;
