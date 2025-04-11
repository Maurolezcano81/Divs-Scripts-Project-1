import { API_URL, endpoints } from "@/globals";
import useAuthStore from "@/stores/authStore";
import { useState } from "react";

type Emotion = {
    name: string;
    intensity: number;
};

type MoodAverages = {
    [moodName: string]: number;
};

type EmotionSummary = {
    date: string;
    emotions: Emotion[];
    moodAverages: MoodAverages;
};

type DataResponse = {
    emotionsSummary: EmotionSummary[];
    recentActivities: any[];
    recentNotes: any[];
    last7Days: string[];
};

interface ErrorRegisterResponse extends Response {
    message: string;
    details: string;
}

const useDashboard = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [success, setSuccess] = useState<boolean>();

    const { token } = useAuthStore();

    const getDashboardInfo = async () => {
        setLoading(true);
        setSuccess(false)
        setError(null);
        try {
            const res = await fetch(`${API_URL}${endpoints.dashboardInfo}`, {
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
                setSuccess(true)
            }
        } catch (error) {
            setError("Hubo un error inesperado");
        } finally {
            setLoading(false);
        }
    };

    return {
        getDashboardInfo,
        loading,
        error,
        success,
        response
    }
}

export default useDashboard;