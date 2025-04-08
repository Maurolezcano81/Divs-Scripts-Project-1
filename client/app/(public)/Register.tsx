import GreenButton from "@/components/Button/GreenButton"
import LabelInput from "@/components/Input/LabelInput"
import Screen from "@/components/ScreenLayout/Screen"
import StarSVG from "@/components/svgs/StarSVG"
import { registerSchema, registerSchemaType } from "@/schemas/AuthSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { IconButton, Switch, Text, TextInput, useTheme } from "react-native-paper"

const Register = () => {

    const { colors } = useTheme();
    const router = useRouter();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "all",
        defaultValues: {
            email_notifications: false,
            terms_privacy: false
        }
    })

    const onSubmit = (data: registerSchemaType) => {
        console.log(data);
    }

    return (
        <Screen className="gap-8">
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}

                className="mt-8"
            >
                <IconButton
                    mode="outlined"
                    onPress={() => router.back()}
                    style={{ padding: 0, margin: 0, borderColor: colors.outline }}
                    iconColor={colors.primary}
                    icon={"arrow-left"}
                >
                </IconButton>

                <StarSVG
                    fill={colors.primary}
                    style={{ flex: 1 }}
                />
            </View>

            <View style={{ marginTop: 12 }}>
                <Text
                    variant="headlineLarge" style={{ color: colors.primary, fontFamily: "Poppins-Bold" }}>
                    Registro
                </Text>
            </View>

            <View className="gap-8 mt-8">
                <Controller
                    name="fullname"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <LabelInput
                            label="Nombre Completo"
                            placeholder="Juan Perez"
                            errorMessage={errors.fullname?.message!}
                            inputProps={{
                                onChangeText: onChange,
                                onBlur: onBlur,
                                value: value,
                                error: !!errors.fullname
                            }}
                        />
                    )}

                />

                <Controller
                    name="username"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <LabelInput
                            label="Nombre de usuario"
                            placeholder="Juanperez01"
                            errorMessage={errors.username?.message!}
                            inputProps={{
                                onChangeText: onChange,
                                onBlur: onBlur,
                                value: value,
                                error: !!errors.username
                            }}
                        />
                    )}

                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <LabelInput
                            label="Correo electronico"
                            placeholder="Juanperez01@correo.com"
                            errorMessage={errors.email?.message!}
                            inputProps={{
                                onChangeText: onChange,
                                onBlur: onBlur,
                                value: value,
                                error: !!errors.email
                            }}
                        />
                    )}

                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <LabelInput
                            placeholder="Contraseña"
                            label="Contraseña"
                            inputProps={{
                                mode: "outlined",
                                secureTextEntry: !isPasswordVisible,
                                right: <TextInput.Icon onPress={() => setIsPasswordVisible(!isPasswordVisible)} icon={!isPasswordVisible ? "eye" : "eye-off-outline"} />,
                                error: !!errors.password?.message,
                                onChangeText: onChange,
                                onBlur: onBlur,
                                value: value
                            }}
                            errorMessage={errors.password?.message!}
                        />
                    )}
                />

                <Controller
                    name="repeatPassword"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <LabelInput
                            placeholder="Repetir contraseña"
                            label="Repetir contraseña"
                            inputProps={{
                                mode: "outlined",
                                secureTextEntry: !isPasswordVisible,
                                error: !!errors.repeatPassword?.message,
                                onChangeText: onChange,
                                onBlur: onBlur,
                                value: value
                            }}
                            errorMessage={errors.repeatPassword?.message!}
                        />
                    )}
                />

                <View>
                    <Controller
                        name="terms_privacy"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 4
                                }}
                            >
                                <Switch value={value} onValueChange={onChange} />

                                <Text className="flex-1" variant="bodyLarge">He leído y acepto los términos y condiciones de uso.</Text>

                            </View>
                        )}
                    />

                    <Controller
                        name="email_notifications"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 4
                                }}
                            >
                                <Switch value={value} onValueChange={onChange} />

                                <Text variant="bodyLarge">Recibir notificaciones al email.</Text>
                            </View>
                        )}
                    />

                </View>

            </View>


            <View className="my-8">
                <GreenButton
                    disabled={Object.keys(errors).length > 1}
                    onPress={handleSubmit(onSubmit)}>
                    Registrarse
                </GreenButton>
            </View>

        </Screen>
    )
}

export default Register