import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

type Message = {
  id: string;
  sender: string;
  content: string;
  createdAt: string;
};

type Props = {
  messages: any;
};

const ChatView: React.FC<Props> = ({ messages = [] }) => {
  const visibleMessages = messages
    .filter((msg: any) => msg.role !== 'system')
    .map((msg: any) => ({
      ...msg,
      role:
        msg.role === 'user'
          ? 'Tú'
          : msg.role === 'assistant'
            ? 'Asistente virtual'
            : msg.role,
    }));

  const { colors } = useTheme();
  return (
    <FlatList
      data={visibleMessages}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{
        backgroundColor: colors.surface
      }}
      renderItem={({ item }) => (
        <Card style={{
          margin: 8,
          backgroundColor: colors.tertiary,
        }} >
          <Card.Content>
            <Text
              style={{
                color: colors.onSurface
              }}
            >
              {item.role}</Text>

            <Text>{item.content}</Text>
            <Text >
              {new Date(item.createdAt).toLocaleTimeString()}
            </Text>
          </Card.Content>
        </Card>
      )}
      ListEmptyComponent={<Text>No hay mensajes</Text>}
    />
  );
};

export default ChatView;
