import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function DocumentVerification() {
  const router = useRouter();
  const [idType, setIdType] = useState('');
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const pickImage = async (side) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera access is needed to upload images.');
      return;
    }

    const useCamera = window.confirm('Take a new photo?\nPress Cancel to choose from gallery.');
    const pickFrom = useCamera ? 'camera' : 'gallery';

    let result;
    if (pickFrom === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      if (side === 'front') {
        setFrontImage(imageUri);
      } else {
        setBackImage(imageUri);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Document Verification</Text>
      <Text style={styles.subtitle}>Upload the necessary document for verification</Text>

      <View style={styles.inputGroup}>
        <Picker
          selectedValue={idType}
          onValueChange={(itemValue) => setIdType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select ID Card" value="" />
          <Picker.Item label="NIN" value="NIN" />
          <Picker.Item label="Voter’s Card" value="VOTER" />
          <Picker.Item label="Driver License" value="DRIVER" />
          <Picker.Item label="International Passport" value="PASSPORT" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.uploadBtn} onPress={() => pickImage('front')}>
        <Text style={styles.uploadText}>
          {frontImage ? 'Front Image Uploaded' : 'Upload Front of ID'}
        </Text>
      </TouchableOpacity>
      {frontImage && <Image source={{ uri: frontImage }} style={styles.preview} />}

      <TouchableOpacity style={styles.uploadBtn} onPress={() => pickImage('back')}>
        <Text style={styles.uploadText}>
          {backImage ? 'Back Image Uploaded' : 'Upload Back of ID'}
        </Text>
      </TouchableOpacity>
      {backImage && <Image source={{ uri: backImage }} style={styles.preview} />}

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: frontImage && backImage ? '#007f5f' : '#aaa' },
        ]}
        onPress={() => router.push('/EnterNIN')}
        disabled={!frontImage || !backImage}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 20,
    color: '#999',
  },
  inputGroup: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  uploadBtn: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 14,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
