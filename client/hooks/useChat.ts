import { API_URL, endpoints } from '@/globals';
import useAuthStore from '@/stores/authStore';
import { useState, useEffect } from 'react';


export const useChats = () => {
    const [chats, setChats] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuthStore();

    const getChats = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}${endpoints.getChats}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();
            console.log(chats)
            setChats(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createChat = async (initialMessage: string) => {

        console.log(initialMessage)

        try {
            const res = await fetch(`${API_URL}${endpoints.createChat}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ initialMessage }),
            });
            const chat = await res.json();
            await getChats();
            return chat;
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getChats();
    }, []);

    return { chats, loading, getChats, createChat };
};
