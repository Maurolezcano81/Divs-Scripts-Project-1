import { LoginResponseSuccess } from "@/hooks/useAuth";
import { User } from "@/types/User.types";
import { create } from "zustand";

interface Store {
    user: User | null;
    login: (data: User) => void;
    clearSession: () => void;
    token: string | null;
    setToken: (token: string) => void;
}

const useAuthStore = create<Store>()
    ((set) => ({
        user: null,
        token: null,
        login: (data) => set(() => ({
            user: {
                ...data
            },
        })),
        setToken: (token) => set(() => ({ token })),
        clearSession: () => set(() => ({ user: null, token: null }))
    }))

export default useAuthStore