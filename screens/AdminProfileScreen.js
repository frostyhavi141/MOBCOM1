import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

const AdminProfileScreen = ({ navigation }) => {
  const { admins, createAdmin, logoutUser } = useContext(AuthContext); //get admins, createAdmin and logoutUser functions from AuthContext
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');

  const handleCreate = () => {
    if (!username.trim() || !password.trim()) { //ensure the field is not empty using trim() to remove whitespace
      Alert.alert('Error', 'Enter username and password');
      return;
    }
    const res = createAdmin({ username, password }); //createAdmin is a function in AuthContext that adds a new admin to the admins state array.
    if (res && res.success) {
      Alert.alert('Success', 'Admin created');
      setUsername('');// Clear form after successful creation
      setPassword('');
    } else {
      Alert.alert('Error', res.message || 'Unable to create admin');
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

        <SafeAreaView style={styles.safe} edges={[ 'top', 'bottom' ]}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backButton}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Admin Management</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Create Admin</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.button} onPress={handleCreate}>
                <Text style={styles.buttonText}>Create Admin</Text>
              </TouchableOpacity>

              <Text style={[styles.label, { marginTop: 16 }]}>Existing Admins</Text>
              {admins && admins.length ? ( //show all available admins
                admins.map((a) => (
                  <View key={a.username} style={styles.adminRow}>
                    <Text style={styles.adminText}>{a.username}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.empty}>No admins</Text>
              )}

              <TouchableOpacity
                style={[styles.button, styles.logoutButton]}
                onPress={() => {
                  logoutUser();
                  navigation.replace('RoleSelection');
                }}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  safe: { flex: 1 },
  container: { paddingHorizontal: 16, paddingVertical: 20, flex: 1 },
  header: { marginBottom: 12 },
  backButton: { color: '#fff', marginBottom: 8 },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  card: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  label: { fontSize: 14, color: '#333', fontWeight: '600', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  logoutButton: { backgroundColor: '#E74C3C' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  adminRow: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  adminText: { color: '#333' },
  empty: { color: '#666' },
});

export default AdminProfileScreen;
