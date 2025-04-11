import React from "react";
import { useAuth } from "@/hooks/useAuth";
import useAuthStore from "@/stores/authStore";
import { Redirect, Slot } from "expo-router";
import { useEffect } from "react";

const UserLayout = () => {
    const { user, token } = useAuthStore();
    const { getUserData } = useAuth();

    useEffect(() => {
        if (!user && token) {
            getUserData();
        }
    }, [token]);

    if (!token) {
        return <Redirect href="/Login" />;
    }

    return <Slot />
};

export default UserLayout;