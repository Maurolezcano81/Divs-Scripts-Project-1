import { API_URL, endpoints } from "@/globals";
import { archetypeWizardType } from "@/schemas/Archetypes.schema"
import { TemperamentWizardType } from "@/schemas/Temper.schema"
import useAuthStore from "@/stores/authStore";
import { useState } from "react"


interface OnboardingResponseSuccess {
    message: string;
}

interface ErrorOnboardingResponse extends Response {
    message: string;
    details: string;
}

export interface dataToFetchOnboarding {
    temperamentScore: Record<string, number>
    archetypeScore: Record<string, number>
}

const useOnboarding = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [success, setSuccess] = useState<boolean>();

    const { token } = useAuthStore();

    const registerOnboarding = async (
        data: dataToFetchOnboarding
    ) => {
        setLoading(true);
        setSuccess(false)
        setError(null);
        try {
            const res = await fetch(`${API_URL}${endpoints.registerOnboarding}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const json: OnboardingResponseSuccess | ErrorOnboardingResponse = await res.json();

            if (!res.ok) {
                const err = json as ErrorOnboardingResponse;
                setError(err.message);
            } else {
                const success = json as OnboardingResponseSuccess;
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
        registerOnboarding,
        loading,
        error,
        success,
        response
    }
}

export default useOnboarding;