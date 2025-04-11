import { View } from "react-native";
import { Controller, Control, FieldErrors } from "react-hook-form";
import LabelInput from "../Input/LabelInput";

interface Props {
  control: Control<any>;
  errors: FieldErrors<any>;
}

const ActivityForm = ({ control, errors }: Props) => {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Controller
        control={control}
        name="titulo"
        rules={{ required: "El título es obligatorio" }}
        render={({ field: { onChange, value } }) => (
          <LabelInput
            placeholder="Titulo de la actividad"
            label="Titulo"
            inputProps={{
              mode: "outlined",
              error: !!errors.titulo?.message,
              onChangeText: onChange,
              value,
            }}
            errorMessage={errors.titulo?.message!}
          />
        )}
      />
      <Controller
        control={control}
        name="descripcion"
        rules={{ required: "La descripción es obligatoria" }}
        render={({ field: { onChange, value } }) => (
          <LabelInput
            placeholder="Descripción de la actividad"
            label="Descripción"
            inputProps={{
              mode: "outlined",
              error: !!errors.descripcion?.message,
              onChangeText: onChange,
              value,
            }}
            errorMessage={errors.descripcion?.message!}
          />
        )}
      />
    </View>
  );
};

export default ActivityForm;
