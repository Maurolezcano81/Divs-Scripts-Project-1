// app/(Main)/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import { Icon, Avatar, Button, Divider, Text, useTheme } from 'react-native-paper';
import { DrawerItemList } from '@react-navigation/drawer';
import { View, ScrollView } from 'react-native';
import useAuthStore from '@/stores/authStore';

export default function MainLayout() {

    const { user, clearSession } = useAuthStore();
    const { colors } = useTheme();

    return (
        <Drawer
            drawerContent={(props) => (
                <ScrollView contentContainerStyle={{ backgroundColor: colors.surface, flexGrow: 1, padding: 16, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{
                            marginBottom: 8,
                            color: colors.primary
                        }} variant="headlineLarge">Menú</Text>
                        <Divider style={{ marginBottom: 8, backgroundColor: colors.onSurface }} />


                        <DrawerItemList {...props} />

                    </View>

                    <View style={{ gap: 16 }}>
                        <Divider style={{ backgroundColor: colors.onSurface }} />
                        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', gap: 8 }}>
                            <Avatar.Text style={{ backgroundColor: colors.primary }} color={colors.onPrimary} size={48} label={user?.name[0]!} />
                            <View>
                                <Text variant="headlineMedium">{user?.name}</Text>
                                <Text variant="bodySmall">@{user?.email!}</Text>
                            </View>
                        </View>

                        <Button textColor={colors.error} mode="text" onPress={clearSession}>
                            Cerrar Sesión
                        </Button>
                    </View>
                </ScrollView>
            )}
            screenOptions={{
                headerStyle: { backgroundColor: colors.surface },
                headerTintColor: colors.onSurface,
                drawerInactiveBackgroundColor: colors.tertiary,
                drawerInactiveTintColor: colors.onTertiary,
                drawerActiveBackgroundColor: colors.primary,
                drawerActiveTintColor: colors.onPrimary,
                headerTitleAlign: 'center',
            }}
        >
            <Drawer.Screen
                name="Home"
                options={{
                    title: "Inicio",
                    drawerIcon: ({ color, size }) => (
                        <Icon source="home-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer>
    );
}
