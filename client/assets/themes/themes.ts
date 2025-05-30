import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';

export const CustomLightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#579C88',
    onPrimary: '#FFFFFF',
    primaryContainer: '#005343',
    onPrimaryContainer: '#FFFFFF',
    secondary: '#193029',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#364E46',
    onSecondaryContainer: '#FFFFFF',
    tertiary: '#083042',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#2B4D60',
    onTertiaryContainer: '#FFFFFF',
    error: '#600004',
    onError: '#FFFFFF',
    errorContainer: '#98000A',
    onErrorContainer: '#FFFFFF',
    background: '#F5FBF6',
    onBackground: '#171D1B',
    surface: '#F5FBF6',
    onSurface: '#000000',
    surfaceVariant: '#DBE5DF',
    onSurfaceVariant: '#000000',
    outline: '#252E2B',
    inverseSurface: '#2B322F',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#86D6BE',
    shadow: '#000000',
    scrim: '#000000',
  },
};

export const CustomDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#86D6BE',
    onPrimary: '#00382C',
    primaryContainer: '#005141',
    onPrimaryContainer: '#A2F2D9',
    secondary: '#B2CCC2',
    onSecondary: '#1D352E',
    secondaryContainer: '#344C44',
    onSecondaryContainer: '#CDE9DE',
    tertiary: '#A9CBE2',
    onTertiary: '#0E3446',
    tertiaryContainer: '#284B5E',
    onTertiaryContainer: '#C5E7FF',
    error: '#FFB4AB',
    onError: '#690005',
    errorContainer: '#93000A',
    onErrorContainer: '#FFDAD6',
    background: '#0F1512',
    onBackground: '#DEE4E0',
    surface: '#0F1512',
    onSurface: '#DEE4E0',
    surfaceVariant: '#3F4945',
    onSurfaceVariant: '#BFC9C4',
    outline: '#89938E',
    inverseSurface: '#DEE4E0',
    inverseOnSurface: '#2B322F',
    inversePrimary: '#0F6B57',
    shadow: '#000000',
    scrim: '#000000',
  },
};