import { API_URL, endpoints } from "@/globals";
import { loginSchemaType, registerSchemaType } from "@/schemas/AuthSchema";
import { useState } from "react"
import { User } from '@/types/User.types';
import useAuthStore from "@/stores/authStore";

interface RegisterResponseSuccess {
    id: User['id'];
    name: User['name'];
    email: User['email'];
}

export interface LoginResponseSuccess {
    user: RegisterResponseSuccess,
    token: string;
}

interface ErrorRegisterResponse extends Response {
    message: string;
    details: string;
}
export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [success, setSuccess] = useState<boolean>();

    const { setToken, token, login } = useAuthStore();

    const registerUser = async (data: registerSchemaType) => {
        setLoading(true);
        setSuccess(false)
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
                setSuccess(true)
            }
        } catch (error) {
            setError("Hubo un error inesperado");
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (data: loginSchemaType) => {
        setLoading(true);
        setSuccess(false)
        setError(null);

        try {
            const res = await fetch(`${API_URL}${endpoints.login}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const json: LoginResponseSuccess | ErrorRegisterResponse = await res.json();

            if (!res.ok) {
                const err = json as ErrorRegisterResponse;
                setError(err.message);
            } else {
                const success = json as LoginResponseSuccess;
                setResponse(success);
                setSuccess(true)

                // hook
                setToken(success.token)
            }
        } catch (error) {
            setError("Hubo un error inesperado");
        } finally {
            setLoading(false);
        }
    }

    const getUserData = async () => {
        setLoading(true);
        setSuccess(false)
        setError(null);

        try {
            const res = await fetch(`${API_URL}${endpoints.profile}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const json: LoginResponseSuccess | ErrorRegisterResponse = await res.json();

            if (!res.ok) {
                const err = json as ErrorRegisterResponse;
                setError(err.message);
            } else {
                const success = json as LoginResponseSuccess;
                setResponse(success);
                setSuccess(true)

                // hook
                login(success.user as User);
            }
        } catch (error) {
            setError("Hubo un error inesperado");
        } finally {
            setLoading(false);
        }
    }


    return {
        registerUser,
        loginUser,
        getUserData,
        loading,
        error,
        response,
        success
    }
}
