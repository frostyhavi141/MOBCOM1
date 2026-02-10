import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const StudentDriverRegistrationScreen = ({ navigation }) => {// State variables to manage form inputs and loading state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentIdImage, setStudentIdImage] = useState(null);
  const [driverLicenseImage, setDriverLicenseImage] = useState(null);
  const [vehicleType, setVehicleType] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const pickStudentIdImage = async () => {// Function to pick student ID image from gallery using Expo ImagePicker
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) setStudentIdImage(result.assets[0].uri);
    } catch (error) {
      console.warn('Failed to pick Student ID image:', error);
    }
  };

  const takeStudentIdPhoto = async () => {// Function to take student ID photo using camera with permission handling
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) return console.warn('Camera permission denied');

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) setStudentIdImage(result.assets[0].uri);
    } catch (error) {
      console.warn('Failed to take Student ID photo:', error);
    }
  };

  const pickDriverLicenseImage = async () => {// Function to pick driver license image from gallery using Expo ImagePicker
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) setDriverLicenseImage(result.assets[0].uri);
    } catch (error) {
      console.warn('Failed to pick Driver License image:', error);
    }
  };

  const takeDriverLicensePhoto = async () => {// Function to take driver license photo using camera with Expo ImagePicker
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) return console.warn('Camera permission denied');

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) setDriverLicenseImage(result.assets[0].uri);
    } catch (error) {
      console.warn('Failed to take Driver License photo:', error);
    }
  };

  // ✅ CHANGED: UI-only submit (no DB, no alerts, no AuthContext)
  const handleRegister = () => {
    setLoading(true);// Simulate a registration process with a timeout (demo mode)

    setTimeout(() => {  
      setLoading(false);

      // reset form
      setFullName('');
      setEmail('');
      setPhone('');
      setStudentIdImage(null);
      setDriverLicenseImage(null);
      setVehicleType('');
      setPlateNumber('');
      setPassword('');
      setConfirmPassword('');

      // balik sa RoleSelection after "submit"
      navigation.replace('RoleSelection');
    }, 800);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground source={require('../assets/register-bg.png')} style={styles.bg} resizeMode="cover">
        <View style={styles.overlay} />

        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backButton}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Student Driver Registration</Text>
              <Text style={styles.subtitle}>Join as a Driver</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#999"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#999"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Student ID Image <Text style={styles.required}>*</Text>
                </Text>
                {studentIdImage ? (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: studentIdImage }} style={styles.imagePreview} />
                    <TouchableOpacity style={styles.removeImageButton} onPress={() => setStudentIdImage(null)}>
                      <Text style={styles.removeImageText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.imageButtonsContainer}>
                    <TouchableOpacity style={styles.imageButton} onPress={takeStudentIdPhoto}>
                      <Text style={styles.imageButtonText}>📷 Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageButton} onPress={pickStudentIdImage}>
                      <Text style={styles.imageButtonText}>📁 Choose</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Driver License Image <Text style={styles.required}>*</Text>
                </Text>
                {driverLicenseImage ? (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: driverLicenseImage }} style={styles.imagePreview} />
                    <TouchableOpacity style={styles.removeImageButton} onPress={() => setDriverLicenseImage(null)}>
                      <Text style={styles.removeImageText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.imageButtonsContainer}>
                    <TouchableOpacity style={styles.imageButton} onPress={takeDriverLicensePhoto}>
                      <Text style={styles.imageButtonText}>📷 Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageButton} onPress={pickDriverLicenseImage}>
                      <Text style={styles.imageButtonText}>📁 Choose</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Vehicle Type</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Toyota Camry, Honda Civic"
                  placeholderTextColor="#999"
                  value={vehicleType}
                  onChangeText={setVehicleType}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>License Plate Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter license plate number"
                  placeholderTextColor="#999"
                  value={plateNumber}
                  onChangeText={setPlateNumber}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={handleRegister}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Submitting...' : 'Register as Driver'}
                </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  safe: { flex: 1 },
  container: { paddingHorizontal: 16, paddingVertical: 20 },
  header: { marginBottom: 20 },
  backButton: { fontSize: 16, color: '#fff', fontWeight: '600', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#e0e0e0' },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 20,
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  required: { color: '#E74C3C' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  button: {
    backgroundColor: '#F5A623',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  note: { fontSize: 12, color: '#666', marginTop: 15, textAlign: 'center', fontStyle: 'italic' },
  imageContainer: { borderRadius: 8, overflow: 'hidden', marginBottom: 10 },
  imagePreview: { width: '100%', height: 180, borderRadius: 8, marginBottom: 10 },
  removeImageButton: { backgroundColor: '#E74C3C', padding: 10, borderRadius: 6, alignItems: 'center' },
  removeImageText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  imageButtonsContainer: { flexDirection: 'row', gap: 10 },
  imageButton: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderWidth: 2,
    borderColor: '#F5A623',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  imageButtonText: { fontSize: 12, fontWeight: '600', color: '#F5A623' },
});

export default StudentDriverRegistrationScreen;
