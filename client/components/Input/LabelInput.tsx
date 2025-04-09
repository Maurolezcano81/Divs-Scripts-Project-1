import { useId } from "react";
import { Field, FieldError } from "react-hook-form";
import { View } from "react-native";
import { Text, TextInput, TextInputProps, useTheme } from "react-native-paper";


interface LabelInputProps {
    label: string;
    placeholder: string;
    inputProps?: TextInputProps;
}

const LabelInput = ({
    label,
    placeholder,
    inputProps,
    errorMessage
}: LabelInputProps & { errorMessage: string }) => {

    const { colors } = useTheme();
    const id = useId();

    return (
        <View className="gap-2">
            <Text id={id} variant="bodyMedium" style={{ fontFamily: "Poppins-Regular" }}>
                {label}
            </Text>
            <TextInput
                id={id}
                style={{ fontFamily: "Poppins-Regular", backgroundColor: colors.surface }}
                placeholder={placeholder}
                placeholderTextColor={colors.outline}
                mode="outlined"
                {...inputProps}
            />
            {errorMessage && errorMessage.length > 0 && (
                <Text style={{ color: colors.error }}>
                    {errorMessage}
                </Text>
            )}
        </View>
    )
}

export default LabelInput;