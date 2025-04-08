import { create } from "zustand";

interface Store {
    user: {
        id: number;
        nombre: string;
    } | null;
    login: () => void;
    clearSession: () => void;
}

const useAuthStore = create<Store>()
    ((set) => ({
        user: null,
        login: () => set((state) => ({ user: { id: 1, nombre: "Mauro Lezcano" } })),
        clearSession: () => set((state) => ({ user: null }))
    }))

export default useAuthStore