import StarSVG from "@/components/svgs/StarSVG";
import { View } from "react-native"
import { Text, TextInput, useTheme } from "react-native-paper"
import LabelInput from "@/components/Input/LabelInput";
import Screen from "@/components/ScreenLayout/Screen";
import { useState } from "react";
import GreenButton from "@/components/Button/GreenButton";
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, loginSchemaType } from "@/schemas/AuthSchema";
import { Link } from "expo-router";

const Login = () => {
    const { colors } = useTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "all"
    })

    const onSubmit = (data: loginSchemaType) => {
        console.log(data)
    }

    return (
        <Screen >
            <View className="items-end pt-8">
                <StarSVG
                    fill={colors.primary}
                />
            </View>

            <View>
                <Text variant="headlineLarge" style={{ color: colors.primary, fontFamily: "Poppins-Bold" }}>
                    Iniciar Sesión
                </Text>
            </View>

            <View className="gap-8 mt-8">
                <Controller
                    name="username"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <LabelInput
                            placeholder="Su nombre de usuario"
                            label="Nombre de usuario"
                            errorMessage={errors.username?.message!}

                            inputProps={{
                                mode: "outlined",
                                error: !!errors.username,
                                onChangeText: onChange,
                                onBlur: onBlur,
                                value: value
                            }}

                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <LabelInput
                            placeholder="Su contraseña"
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

            </View>

            <View className="mt-12">
                <GreenButton
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}
                    disabled={Object.keys(errors).length > 0}
                >
                    Iniciar Sesión
                </GreenButton>
            </View>

            <View className="mt-8">
                <Text variant="bodyLarge" style={{ color: colors.outline, textAlign: "center" }}>
                    Todavía no tienes una cuenta? <Link href={'/Register'} 
                        style={{ color: colors.primary, fontWeight: 800, textDecorationLine: "underline" }}
                    >Registrarse</Link>
                </Text>
            </View>

        </Screen >
    )
}

export default Login;