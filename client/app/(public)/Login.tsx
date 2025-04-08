import StarSVG from "@/components/svgs/StarSVG";
import useAuthStore from "@/stores/authStore"
import { View } from "react-native"
import { Button, IconButton, Text, TextInput, useTheme } from "react-native-paper"
import LabelInput from "@/components/Input/LabelInput";
import Screen from "@/components/ScreenLayout/Screen";
import { useState } from "react";
import GreenButton from "@/components/Button/GreenButton";
import { Link, Redirect } from "expo-router";


const Login = () => {

    const { colors } = useTheme();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <Screen >
            <View className="pt-8 items-end">
                <StarSVG
                    fill={colors.primary}
                />
            </View>

            <View>
                <Text variant="headlineLarge" style={{ color: colors.primary, fontFamily: "Poppins-Bold" }}>
                    Iniciar Sesión
                </Text>
            </View>

            <View className="mt-8 gap-8">

                <LabelInput
                    placeholder="Su nombre de usuario"
                    label="Nombre de usuario"
                    inputProps={{
                        mode: "outlined",
                    }}
                />

                <LabelInput
                    placeholder="Su contraseña"
                    label="Contraseña"
                    inputProps={{
                        mode: "outlined",
                        secureTextEntry: !isPasswordVisible,
                        right: <TextInput.Icon onPress={() => setIsPasswordVisible(!isPasswordVisible)} icon={!isPasswordVisible ? "eye" : "eye-off-outline"} />
                    }}
                />
            </View>

            <View className="mt-12">
                <GreenButton
                    mode="contained"
                >
                    Iniciar Sesión
                </GreenButton>
            </View>

            <View className="mt-8">
                <Text variant="bodyLarge" style={{ color: colors.outline, textAlign: "center" }}>
                    Todavía no tienes una cuenta? <Text
                        style={{ color: colors.primary, fontWeight: 800, textDecorationLine: "underline" }}
                    >Registrarse</Text>
                </Text>
            </View>

        </Screen >
    )
}

export default Login;