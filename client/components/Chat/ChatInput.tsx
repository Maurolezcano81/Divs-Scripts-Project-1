import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

type Props = {
  onSend: (message: string) => void;
};

 const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="Escribe un mensaje..."
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSend} style={styles.button}>
        Enviar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default ChatInput