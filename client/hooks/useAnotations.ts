import Anotations from "@/app/(private)/(user)/Anotations";
import { API_URL, endpoints } from "@/globals";
import useAuthStore from "@/stores/authStore";
import { useEffect, useState } from "react";
import { boolean } from "zod";

type Activity = {
    title: string;
    description: string;
    status: boolean;
    dueDate: string;
};

type DataResponse = {
    activityesSummary: Activity[];
};

interface ErrorRegisterResponse extends Response {
    message: string;
    details: string;
}

const useAnotations = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [listAnotations, setListAnotations] = useState<Activity[]>([])
    const [success, setSuccess] = useState<boolean>();
    const [created, setCreated] = useState<boolean>(false);

    const { token } = useAuthStore();

    const getAnotations = async () => {
        setLoading(true);
        setSuccess(false)
        setError(null);
        try {
            const res = await fetch(`${API_URL}${endpoints.getAnotations}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const json: DataResponse | ErrorRegisterResponse = await res.json();

            if (!res.ok) {
                const err = json as ErrorRegisterResponse;
                setError(err.message);
            } else {
                const success = json as any;
                setResponse(success);
                setListAnotations(success)
                setSuccess(true)
            }
        } catch (error) {
            setError("Hubo un error inesperado");
        } finally {
            setLoading(false);
        }
    };

    console.log(created)

    useEffect(() => {
        getAnotations();
    }, [created]);

    const createAnotations = async (data: any) => {
        setLoading(true);
        setSuccess(false)
        setError(null);
        try {
            const res = await fetch(`${API_URL}${endpoints.createAnotations}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const json: DataResponse | ErrorRegisterResponse = await res.json();

            console.log(json);
            if (!res.ok) {
                const err = json as ErrorRegisterResponse;
                setError(err.message);
            } else {
                setResponse(json);
                setListAnotations(prev => [...prev, data]);
                setCreated(!created);
                setSuccess(true);
            }
        } catch (error) {
            setError("Hubo un error inesperado");
        } finally {
            setLoading(false);
        }
    };


    return {
        getAnotations,
        loading,
        error,
        success,
        response,
        createAnotations,
        listAnotations,
    }
}

export default useAnotations;