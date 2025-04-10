import CustomDialog from "@/components/dialog/Dialog";
import LabelInput from "@/components/Input/LabelInput";
import Screen from "@/components/ScreenLayout/Screen";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, FAB, Searchbar, Text, TextInput, useTheme } from "react-native-paper";

interface Activity {
  id: string;
  titulo: string;
  descripcion: string;
  is_completed: boolean;
  fecha: Date;
}

interface ActivityFormData {
  titulo: string;
  descripcion: string;
  is_completed: boolean;
  fecha: Date;
}

const initialActivities: Activity[] = [
    {
        id: "1",
        titulo: "Practicar meditación",
        descripcion: "Realizar una sesión de meditación guiada de 10 minutos.",
        is_completed: false,
        fecha: new Date(2023, 9, 1),
    },
    {
        id: "2",
        titulo: "Escribir en el diario",
        descripcion: "Anotar pensamientos y emociones del día.",
        is_completed: true,
        fecha: new Date(2023, 9, 2),
    },
    {
        id: "3",
        titulo: "Hacer ejercicio ligero",
        descripcion: "Caminar al aire libre durante 20 minutos.",
        is_completed: false,
        fecha: new Date(2023, 9, 3),
    },
    {
        id: "4",
        titulo: "Leer un libro",
        descripcion: "Leer un capítulo de un libro inspirador.",
        is_completed: true,
        fecha: new Date(2023, 9, 4),
    },
    {
        id: "5",
        titulo: "Escuchar música relajante",
        descripcion: "Dedicar tiempo a escuchar música que ayude a relajarse.",
        is_completed: false,
        fecha: new Date(2023, 9, 5),
    },
];

const Activities = () => {

    const { colors } = useTheme();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { handleSubmit, control, reset,formState: { errors }} = useForm<ActivityFormData>({
    defaultValues: {
      titulo: '',
      descripcion: '',
      is_completed: false,
      fecha: new Date()
    }
  });

  useEffect(()=>{
    setActivities(initialActivities);
  }, [])

  const onSubmit = (data: ActivityFormData) => {
   console.log(data);
    setIsDialogVisible(false);
    reset();
    };
   

 const filteredActivities = activities.filter(activity =>
    activity.titulo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ActivityForm = () => (
        <View style={{ padding: 16 }}>
                <Controller
                    control={control}
                    name="titulo"
                    render={({ field: { onChange, value } }) => (
                        <LabelInput
                                placeholder="Titulo de la actividad"
                                label="Titulo"
                                inputProps={{
                                    mode: "outlined",
                                    error: !!errors.titulo?.message,
                                    onChangeText: onChange,
                                    value: value
                                    }}
                                errorMessage={errors.titulo?.message!}
                        />
                    )}
                    />
                <Controller
                    control={control}
                    name="descripcion"
                    render={({ field: { onChange, value } }) => (
                        <LabelInput
                                placeholder="Descripción de la actividad"
                                label="Descripción"
                                inputProps={{
                                    mode: "outlined",
                                    error: !!errors.descripcion?.message,
                                    onChangeText: onChange,
                                    value: value
                            }}
                        errorMessage={errors.descripcion?.message!}
            />
        )}
    />
        </View>
    );


return (
        <Screen>
            <View className="pt-8">
                <Text variant="headlineLarge" style={{ color: colors.primary, fontFamily: "Poppins-Bold" }}>
                    Mis Actividades
                </Text>
            </View>
            
            <View className="gap-8 mt-8">
                    <Searchbar
                        placeholder="Buscar"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={{ marginBottom: 16 }}
                    />
            </View>
        
            {activities.length > 0 ? (
            <View>
                <FlatList
                    data={filteredActivities}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text variant="titleMedium" style={{ fontFamily: "Poppins-Bold" }}>
                                {item.titulo}
                            </Text>
                            <Text variant="bodyMedium" style={{ fontFamily: "Poppins-Regular" }}>
                                {item.descripcion}
                            </Text>
                            <Text variant="bodySmall" style={{ fontFamily: "Poppins-Regular", color: colors.primary }}>
                                {item.fecha.toLocaleDateString()}
                            </Text>
                        </Card.Content>
                    </Card>
                )}
                    style={{ marginBottom: 16 }}
                />
        </View>
        ) : (
        <View>
            <Text style={{ textAlign: 'center', marginVertical: 20 }}>
                No hay actividades. ¡Añade una!
            </Text>
        </View>

        )}
        <View>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => setIsDialogVisible(true)}/>
        </View>
        <View>
            <CustomDialog
                isVisible={isDialogVisible}
                onDismiss={() => {
                    setIsDialogVisible(false);
                    reset();
                }}
                onSubmit={handleSubmit(onSubmit)}
                title="Crear Nueva Actividad"
            >

            <ActivityForm />

            </CustomDialog>
        </View>
        
        </Screen>
  );

  };

export default Activities;




  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 10,
      right: 0,
      bottom: -100,
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
    }
  })