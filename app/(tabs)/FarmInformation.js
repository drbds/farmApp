// app/FarmInformation.tsx
import CheckBox from '@react-native-community/checkbox';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function FarmInformation() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Farm Information</Text>

      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Business type" style={styles.input} />
      <TextInput placeholder="Location" style={styles.input} />
      <TextInput placeholder="Products Interested in" style={styles.input} />

      <View style={styles.checkboxContainer}>
        <CheckBox value={isChecked} onValueChange={setIsChecked} />
        <Text style={styles.checkboxLabel}>By clicking this, you accept the <Text style={{ color: 'red' }}>terms and conditions</Text></Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/app/DocumentVerification')}
        disabled={!isChecked}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1
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
    marginBottom: 15
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 12,
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
