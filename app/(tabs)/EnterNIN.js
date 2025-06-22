// app/EnterNIN.tsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EnterNIN() {
  const router = useRouter();
  const [nin, setNin] = useState('');

  const handleSubmit = () => {
    if (nin.trim().length === 11) {
      alert('NIN Submitted Successfully!');
      router.push('/'); // You can redirect to home or success screen
    } else {
      alert('Please enter a valid 11-digit NIN');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter NIN</Text>

      <TextInput
        placeholder="Enter your 11-digit NIN"
        keyboardType="number-pad"
        value={nin}
        onChangeText={setNin}
        maxLength={11}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#007f5f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
