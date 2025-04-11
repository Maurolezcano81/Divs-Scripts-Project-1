import { View } from "react-native";
import CustomDialog from "../dialog/Dialog";
import { Controller, useForm } from "react-hook-form";
import ActivityForm from "./ActivityForm";
import GreenButton from "../Button/GreenButton";
import { useState } from "react";
import useActivities from "@/hooks/useActivities";
import { Portal, Dialog, Button, useTheme, } from "react-native-paper";
import LabelInput from "../Input/LabelInput";

export type ActivityFormData = {
    title: string;
    description: string;
    is_completed: boolean;
    dueDate: Date;
};

const ModalCreate = () => {
    const { createActivity } = useActivities();
    const { colors } = useTheme();
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ActivityFormData>({
        defaultValues: {
            title: "",
            description: "",
        },
        mode: "onTouched",
    });


    const onSubmit = (data: any) => {


        const payload = {
            title: data.title,
            description: data.description,
            status: "pendiente",
            dueDate: new Date()
        };
        console.log(payload)

        createActivity(payload);
        setIsDialogVisible(false);
        reset();
    };

    return (
        <View>
            <GreenButton icon="plus" onPress={() => setIsDialogVisible(true)}>
                Agregar Tarea
            </GreenButton>

            {isDialogVisible && (

                <Portal>
                    <Dialog visible={isDialogVisible} onDismiss={() => {
                        setIsDialogVisible(false);
                        reset();
                    }}
                        style={{ backgroundColor: colors.background }}
                    >
                        <Dialog.Title>Crear Actividad</Dialog.Title>
                        <Dialog.Content>
                            <View style={{ padding: 16, gap: 12 }}>
                                <Controller
                                    control={control}
                                    name="title"
                                    rules={{ required: "El título es obligatorio" }}
                                    render={({ field: { onChange, value } }) => (
                                        <LabelInput
                                            placeholder="Titulo de la actividad"
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
                                    name="description"
                                    rules={{ required: "La descripción es obligatoria" }}
                                    render={({ field: { onChange, value } }) => (
                                        <LabelInput
                                            placeholder="Descripción de la actividad"
                                            label="Descripción"
                                            inputProps={{
                                                mode: "outlined",
                                                error: !!errors.description?.message,
                                                onChangeText: onChange,
                                                value,
                                            }}
                                            errorMessage={errors.description?.message!}
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
