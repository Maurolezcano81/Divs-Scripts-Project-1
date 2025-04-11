import React, { useState } from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { Icon } from 'react-native-paper';
import Home from './Home';
import Asistant from './Asistant';

export default function HomeLayout() {
  const [index, setIndex] = useState(0);
  const { colors } = useTheme();
  const [routes] = useState([
    { key: 'home', title: 'Inicio', icon: 'home-outline' },
    { key: 'asistant', title: 'Asistente', icon: 'robot-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    asistant: Asistant,
  });

  const renderIcon = ({ route, focused, color }) => {
    let iconName = route.icon;
    let iconColor = focused ? colors.background : colors.outline;

    return <Icon source={iconName} color={iconColor} size={24} />;
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={renderIcon}
      inactiveColor={colors.outline}
      barStyle={{ backgroundColor: colors.background }}
    />
  );
}
