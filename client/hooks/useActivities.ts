import Activities from "@/app/(private)/(user)/Activities";
import { API_URL, endpoints } from "@/globals";
import useAuthStore from "@/stores/authStore";
import { useState } from "react";

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

const useActivities = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [listActivities, setListActivities] = useState<Activity[]>([])
    const [success, setSuccess] = useState<boolean>();

    const { token } = useAuthStore();

    const getActivities = async () => {
        setLoading(true);
        setSuccess(false)
        setError(null);
        try {
            const res = await fetch(`${API_URL}${endpoints.getActivities}`, {
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
                const success = json as DataResponse;
                setResponse(success);
                setListActivities(success)
                setSuccess(true)
            }
        } catch (error) {
            setError("Hubo un error inesperado");
        } finally {
            setLoading(false);
        }
    };

    const createActivity = async (data: Activity) => {
        setLoading(true);
        setSuccess(false)
        setError(null);
        try {
            const res = await fetch(`${API_URL}${endpoints.createActivity}`, {
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
                setListActivities(prev => [...prev, data]);
                setSuccess(true);
            }
        } catch (error) {
            setError("Hubo un error inesperado");
        } finally {
            setLoading(false);
        }
    };


    return {
        getActivities,
        loading,
        error,
        success,
        response,
        createActivity,
        listActivities,
    }
}

export default useActivities;