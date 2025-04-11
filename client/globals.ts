import Constants from 'expo-constants';

export const API_URL = `${Constants.expoConfig?.extra?.API_URL}`;

export const endpoints = {
    login: "/auth/login",
    register: "/auth/register",
    profile: "/auth/profile",
    registerOnboarding: "/onboarding",
    dashboardInfo: "/dashboard",
    getActivities: "/activities",
    createActivity: "/activities",
    getChats: "/chats",
    createChat: "/chats/create",
    getChatById: "/messages", // id por params
    createMessage: "/messages",
    getAnotations: "/notes",
    createAnotations: "/notes",
}
