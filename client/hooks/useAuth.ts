import { API_URL, endpoints } from "@/globals";
import { registerSchemaType } from "@/schemas/AuthSchema";
import { useState } from "react"
import { User } from '@/types/User.types';

interface RegisterResponseSuccess extends Response {
    id: User['id'];
    name: User['name'];
    email: User['email'];
}

interface ErrorRegisterResponse extends Response {
    message: string;
    details: string;
}
export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);

    const registerUser = async (data: registerSchemaType) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_URL}${endpoints.register}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const json: RegisterResponseSuccess | ErrorRegisterResponse = await res.json();

            if (!res.ok) {
                const err = json as ErrorRegisterResponse;
                setError(err.message);
            } else {
                const success = json as RegisterResponseSuccess;
                setResponse(success);
            }
        } catch (error) {
            setError("Hubo un error inesperado");
        } finally {
            setLoading(false);
        }
    };


    return {
        registerUser,
        loading,
        error,
        response
    }
}
