import GreenButton from "@/components/Button/GreenButton"
import LabelInput from "@/components/Input/LabelInput"
import Screen from "@/components/ScreenLayout/Screen"
import StarSVG from "@/components/svgs/StarSVG"
import { useAuth } from "@/hooks/useAuth"
import { registerSchema, registerSchemaType } from "@/schemas/AuthSchema"
import { nacionalities } from "@/services/Nacionality.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { Redirect, useRouter } from "expo-router"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { Button, HelperText, IconButton, Menu, RadioButton, Text, TextInput, useTheme } from "react-native-paper"

const Register = () => {

    const { colors } = useTheme();
    const { registerUser, loading, error, response } = useAuth()
    const router = useRouter();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "all",
    })

    const [nacionalityVisible, setNacionalityVisible] = useState(false);

    const openMenu = () => setNacionalityVisible(true);
    const closeMenu = () => setNacionalityVisible(false);


    const onSubmit = (data: registerSchemaType) => {
        console.log(data);
        registerUser(data);
    }

    console.log(errors)
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

                <Controller
                    control={control}
                    name={"nacionality"}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <View>
                            <Text className="mb-4" variant="bodyMedium" style={{ fontFamily: "Poppins-Regular" }}>
                                Nacionalidad
                            </Text>

                            <Menu
                                visible={nacionalityVisible}
                                onDismiss={closeMenu}
                                anchor={<Button mode="outlined" onPress={openMenu}>{value || "Seleccione su nacionalidad"}</Button>}
                            >
                                {nacionalities.map((nacionalidad) => (
                                    <Menu.Item
                                        key={nacionalidad}
                                        onPress={() => {
                                            onChange(nacionalidad);
                                            closeMenu();
                                        }}
                                        title={nacionalidad}
                                    />
                                ))}
                            </Menu>
                            {error && <HelperText type="error" visible>{error.message}</HelperText>}
                        </View>
                    )}
                />

                <Controller
                    name="sex"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <Text variant="bodyMedium" style={{ fontFamily: "Poppins-Regular" }}>
                                Genero
                            </Text>

                            <RadioButton.Group onValueChange={onChange} value={value}>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    flexGrow: 1
                                }}>
                                    <RadioButton.Item style={{ flexGrow: 1 }} label="Masculino" value="Masculino" />
                                    <RadioButton.Item style={{ flexGrow: 1 }} label="Femenino" value="Femenino" />
                                    <RadioButton.Item style={{ flexGrow: 1 }} label="Otro/a" value="Otro" />
                                </View>
                            </RadioButton.Group>
                        </View>
                    )}
                />


            </View>

            <View className="my-8">
                <GreenButton
                    disabled={Object.keys(errors).length > 1 || loading}
                    loading={loading}
                    onPress={handleSubmit(onSubmit)}>
                    Registrarse
                </GreenButton>
            </View>

        </Screen>
    )
}

export default Register