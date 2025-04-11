import StarSVG from "@/components/svgs/StarSVG";
import { View } from "react-native"
import { Text, TextInput, useTheme } from "react-native-paper"
import LabelInput from "@/components/Input/LabelInput";
import Screen from "@/components/ScreenLayout/Screen";
import { useEffect, useState } from "react";
import GreenButton from "@/components/Button/GreenButton";
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, loginSchemaType } from "@/schemas/AuthSchema";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
    const { colors } = useTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "all"
    })

    const { loginUser, loading, error, success } = useAuth()
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const onSubmit = (data: loginSchemaType) => {
        loginUser(data);
    }

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setShouldRedirect(true);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [success]);

    if (shouldRedirect) {
        return <Redirect href="/(private)/(user)/(Home)/Home" />;
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
                    name="email"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <LabelInput
                            placeholder="Correo Electrónico"
                            label="Correo Electrónico"
                            errorMessage={errors.email?.message!}

                            inputProps={{
                                mode: "outlined",
                                error: !!errors.email,
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

            <View className="gap-4 mt-12">
                {error && (
                    <Text>
                        {error}
                    </Text>

                )}

                <GreenButton
                    disabled={Object.keys(errors).length > 1 || loading || success}
                    loading={loading}
                    onPress={handleSubmit(onSubmit)}>
                    {success ? "Redirigiendo..." : "Iniciar Sesión"}
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