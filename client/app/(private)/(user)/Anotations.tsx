import ModalCreate from "@/components/Anotations/ModalCreate";
import GreenButton from "@/components/Button/GreenButton";
import Screen from "@/components/ScreenLayout/Screen";
import useAnotations from "@/hooks/useAnotations";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Searchbar, Text, useTheme, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

// Componente acepta prop opcional 'limit'
const Anotations = ({ limit }: { limit?: number }) => {
    const { colors } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");

    const {
        getAnotations,
        loading,
        listAnotations,
        createAnotations
    } = useAnotations();

    useEffect(() => {
        getAnotations();
    }, []);

    const filteredActivities = Array.isArray(listAnotations)
        ? listAnotations.filter((activity: any) => {
            const titulo = activity.title?.toLowerCase() || "";
            const descripcion = activity.content?.toLowerCase() || "";
            const query = searchQuery.toLowerCase();
            return titulo.includes(query) || descripcion.includes(query);
        })
        : [];

    // Aplica el límite si está definido
    const activitiesToShow = limit ? filteredActivities.slice(0, limit) : filteredActivities;

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.surface }}>
                <Text>Cargando anotaciones...</Text>
            </SafeAreaView>
        );
    }

    return (
        <Screen scrollable={false}>
            {!limit && (
                <View>
                    <View style={{ paddingTop: 8 }}>
                        <Text variant="headlineLarge" style={{ color: colors.primary, fontFamily: "Poppins-Bold" }}>
                            Mis Notas
                        </Text>
                    </View>

                    <View style={{ marginTop: 8, gap: 8 }}>
                        <Searchbar
                            placeholder="Buscar"
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                            style={{ color: colors.onBackground, backgroundColor: colors.background, marginBottom: 8 }}
                        />

                        <View style={{ gap: 8, marginBottom: 12 }}>
                            <ModalCreate createAnotations={createAnotations} />
                            <GreenButton icon="refresh" onPress={getAnotations}>
                                Refrescar
                            </GreenButton>
                        </View>
                    </View>
                </View>
            )}


            {activitiesToShow.length > 0 ? (
                <FlatList
                    data={activitiesToShow}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <Card style={{ backgroundColor: colors.background, marginBottom: 16, borderRadius: 10 }}>
                            <Card.Content>
                                <Text variant="titleMedium" style={{ fontFamily: "Poppins-Bold" }}>
                                    {item.title}
                                </Text>
                                <Text variant="bodyMedium" style={{ fontFamily: "Poppins-Regular", margin: 4 }}>
                                    {item.content}
                                </Text>
                                <Text variant="bodySmall" style={{ fontFamily: "Poppins-Regular", color: colors.primary }}>
                                    {new Date(item.updatedAt).toLocaleDateString()}
                                </Text>
                            </Card.Content>
                        </Card>
                    )}
                    contentContainerStyle={{ paddingBottom: 16 }}
                />
            ) : (
                <View>
                    <Text style={{ textAlign: "center", marginVertical: 20 }}>
                        No hay anotaciones. ¡Añade una!
                    </Text>
                </View>
            )}
        </Screen>
    );
};

export default Anotations;
