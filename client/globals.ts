import Constants from 'expo-constants';

export const API_URL = `${Constants.expoConfig?.extra?.API_URL}`;

export const endpoints = {
    login: "/auth/login",
    register: "/auth/register",
    profile: "/auth/profile"
}
