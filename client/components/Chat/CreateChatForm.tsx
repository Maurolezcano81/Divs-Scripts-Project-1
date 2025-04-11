import React from 'react';
import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button, HelperText } from 'react-native-paper';
import LabelInput from '../Input/LabelInput';

const schema = z.object({
  initialMessage: z.string().min(1, 'Mensaje requerido'),
});

type FormData = z.infer<typeof schema>;

type Props = {
  onSubmit: (initialMessage: string) => void;
};

const CreateChatForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <View style={{ gap: 8, marginTop: 8 }}>

      <Controller
        name="initialMessage"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (

          <LabelInput
            placeholder="Mensaje Inicial"
            label="Mensaje inicial"
            errorMessage={errors.initialMessage?.message!}
            inputProps={{
              mode: "outlined",
              error: !!errors.initialMessage,
              onChangeText: onChange,
              onBlur: onBlur,
              value: value
            }}

          />
        )}
      />

      <Button mode="contained" onPress={handleSubmit((data) => onSubmit(data.initialMessage))}>
        Crear Chat
      </Button>
    </View>
  );
};

export default CreateChatForm