import { API_URL, endpoints } from '@/globals';
import useAuthStore from '@/stores/authStore';
import { useState, useEffect } from 'react';


export const useMessages = (chatId: any | null) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuthStore();



    useEffect(() => {
        if (chatId) getMessages();
    }, [chatId]);

    const getMessages = async () => {
        if (!chatId) return;

        console.log(chatId);
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}${endpoints.getChats}/${chatId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setMessages(data?.messages || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (message: string) => {
        if (!chatId) return;
        try {
            await fetch(`${API_URL}${endpoints.getChats}/${chatId}${endpoints.createMessage}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ message }),
            });
            await getMessages();
        } catch (err) {
            console.error(err);
        }
    };

    return { messages, loading, sendMessage };
};
