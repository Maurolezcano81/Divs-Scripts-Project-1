
import ChatInput from '@/components/Chat/ChatInput';
import ChatList from '@/components/Chat/ChatList';
import ChatView from '@/components/Chat/ChatView';
import CreateChatForm from '@/components/Chat/CreateChatForm';
import Screen from '@/components/ScreenLayout/Screen';
import { useChats } from '@/hooks/useChat';
import { useMessages } from '@/hooks/useMessages';
import React, { useState } from 'react';
import { ActivityIndicator, Button, useTheme, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Asistant = () => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const { colors } = useTheme();
    const { chats, createChat, loading: chatsLoading } = useChats();
    const { messages, loading: messagesLoading, sendMessage } = useMessages(selectedChatId);

    const handleSelect = (id: string) => {
        if (selectedChatId === id) {
            setSelectedChatId(null);
            setTimeout(() => setSelectedChatId(id), 10);
        } else {
            setSelectedChatId(id);
        }
    };

    const handleCreateChat = async (initialMessage: string) => {
        const newChat = await createChat(initialMessage);
        if (newChat?._id) {
            setSelectedChatId(newChat._id);
        }
    };

    return (
        <Screen scrollable={false}>

            <Text variant="headlineMedium">Asistente Emocional</Text>

            {selectedChatId ? (
                <>
                    {messagesLoading ? (
                        <ActivityIndicator style={{ margin: 16 }} />
                    ) : (
                        <ChatView messages={messages} />
                    )}
                    <ChatInput onSend={sendMessage} />
                    <Button onPress={() => setSelectedChatId(null)} style={{ margin: 8 }}>
                        Volver
                    </Button>
                </>
            ) : (
                <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
                    <CreateChatForm onSubmit={handleCreateChat} />
                    {chatsLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <ChatList chats={chats} onSelect={handleSelect} />
                    )}
                </SafeAreaView>
            )}
        </Screen>
    );
};

export default Asistant