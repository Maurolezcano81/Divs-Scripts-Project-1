import { create } from "zustand";

interface Store {
    user: User | null;
    login: () => void;
    clearSession: () => void;
}

const useAuthStore = create<Store>()
    ((set) => ({
        user: null,
        login: () => set((state) => (state)),
        clearSession: () => set(() => ({ user: null }))
    }))

export default useAuthStore