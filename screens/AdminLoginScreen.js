import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

  //using hooks to manage state for admin login form
const AdminLoginScreen = ({ navigation }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Default admin credentials (for demo purposes)
  const ADMIN_ID = 'admin123';
  const ADMIN_PASSWORD = 'password123';

  const handleLogin = () => {
    if (!adminId.trim() || !password.trim()) { //ensure the field is not empty using trim() to remove whitespace
      Alert.alert('Error', 'Please enter both Admin ID and password');
      return;
    }

    if (adminId === ADMIN_ID && password === ADMIN_PASSWORD) {
      setLoading(true);// Simulate loading time for better UX
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Success', 'Admin login successful!', [
          {
            text: 'OK',
            onPress: () => { // Clear form and navigate to AdminVerificationScreen
              setAdminId('');
              setPassword('');
              navigation.replace('AdminVerification');
            },
          },
        ]);
      }, 1000);
    } else {
      Alert.alert('Error', 'Invalid Admin ID or password');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('../assets/register-bg.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            {/*h*/}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backButton}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Admin Login</Text>
              <Text style={styles.subtitle}>Verify pending student accounts</Text>
            </View>

            {}

            {}
            <View style={styles.card}>
              {/*admin*/}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Admin ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your admin ID"
                  placeholderTextColor="#999"
                  value={adminId}
                  onChangeText={setAdminId}
                />
              </View>

              {/*for pass*/}
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

              {/*loginbutton*/}
              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Logging in...' : 'Login as Admin'}
                </Text>
              </TouchableOpacity>

              {/* Note for users*/}
              <Text style={styles.note}>
                Only admins can access the verification dashboard
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  safe: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 4,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
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
    backgroundColor: '#E74C3C',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#666',
    marginTop: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default AdminLoginScreen;
