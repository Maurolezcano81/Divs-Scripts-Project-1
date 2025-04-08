import { useId } from "react";
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
    inputProps
}: LabelInputProps) => {

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
                {...inputProps}
            />
        </View>
    )
}

export default LabelInput;