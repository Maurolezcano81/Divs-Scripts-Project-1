import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Home from '@/app/(private)/(user)/(Home)/Home';
import Asistant from '@/app/(private)/(user)/(Home)/Asistant';
import { View } from 'react-native';
import { Avatar, Button, Divider, Icon, Text, useTheme } from 'react-native-paper';
import useAuthStore from '@/stores/authStore';
import HomeLayout from './(Home)/_layout';
import Activities from './Activities';
import Anotations from './Anotations';
import HistoryEmotions from './HistoryEmotions';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { user, clearSession, setTheme } = useAuthStore();
  const { colors } = useTheme();

  return (
    <Drawer.Navigator

      drawerContent={props => (
        <View style={{ flex: 1, justifyContent: 'space-between', padding: 16 }}>
          <View>
            <Text variant="titleLarge" style={{ marginBottom: 8 }}>Menú</Text>
            <Divider style={{ marginBottom: 8 }} />
            <DrawerItemList {...props} />
          </View>

          <View style={{ gap: 16 }}>
            <Divider />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Avatar.Text label={user?.name[0]!} size={48} />
              <View>
                <Text variant="titleMedium">{user?.name}</Text>
                <Text variant="bodySmall">@{user?.email}</Text>
              </View>
            </View>
            <Button onPress={clearSession} textColor={colors.error}>Cerrar sesión</Button>
          </View>
        </View>
      )}

      screenOptions={{
        drawerActiveTintColor: colors.onPrimary,
        drawerActiveBackgroundColor: colors.primary,
        drawerInactiveTintColor: colors.outline,
        drawerInactiveBackgroundColor: colors.background,
        headerTitleAlign: "center",
        headerTintColor: colors.onSurface,
        drawerStyle: {
          backgroundColor: colors.background,
        },
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerRight: () => (
          <Button
            onPress={setTheme}
          >
            <Icon
              source="theme-light-dark"
              size={32}
              color={colors.primary}
            />
          </Button>

        ),
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeLayout}
        options={{
          drawerIcon: ({ color, size }) => <Icon source="home-outline" size={size} color={color} />
        }} />

      <Drawer.Screen name="Seguimiento de emociones" component={HistoryEmotions}
        options={{
          drawerIcon: ({ color, size }) => <Icon source="history" size={size} color={color} />
        }}
        listeners={({ navigation }) => ({
          drawerItemPress: (e) => {
            e.preventDefault();
          },
        })}
      />

      <Drawer.Screen name="Actividades" component={Activities}
        options={{
          drawerIcon: ({ color, size }) => <Icon source="format-list-checkbox" size={size} color={color} />
        }} />

      <Drawer.Screen name="Notas" component={Anotations}
        options={{
          drawerIcon: ({ color, size }) => <Icon source="notebook" size={size} color={color} />
        }} />
    </Drawer.Navigator>

  );
}
