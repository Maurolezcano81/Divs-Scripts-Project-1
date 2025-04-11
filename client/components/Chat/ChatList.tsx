import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, useTheme } from 'react-native-paper';

type Props = {
  chats: any[];
  onSelect: (id: string) => void;
};


const ChatList: React.FC<Props> = ({ chats, onSelect }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <List.Item
            title={`Chat #${item.title}`}
            description={`Última Actualización: ${new Date(item.updatedAt).toLocaleTimeString()}`}
            onPress={() => {
              onSelect(item._id)
            }}
            left={(props) => <List.Icon color={colors.primary} icon="forum" />}
          />
        )}
        contentContainerStyle={styles.container}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
});

export default ChatList
