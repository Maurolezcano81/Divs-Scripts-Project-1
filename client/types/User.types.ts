export interface User {
    id: string;
    name: string;
    email: string;
    active: boolean;
    birthDate: string;
    gender: "Masculino" | "Femenino" | "Otro/a";
    nationality: string;
    ethnicity: string;
    archetype: any[];
    temperament: any[];
    emotions: any[];
    chats: any[];
    notes: any[];
    activities: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}