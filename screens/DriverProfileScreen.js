import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

const DriverProfileScreen = ({ navigation }) => {// Get currentUser, logoutUser and updateUserProfile functions from AuthContext
  const { currentUser, logoutUser, updateUserProfile } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);// State to manage whether the profile is in edit mode
  const [editData, setEditData] = useState(currentUser || {}); // State to manage the editable profile data, initialized with currentUser data

  // If user is not logged in, show a message

  if (!currentUser) {
    return (
      <View style={styles.notLoggedInContainer}>
        <Text style={styles.notLoggedInText}>Please login first</Text>
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {// Clear user session and navigate to RoleSelection screen
          logoutUser();
          navigation.replace('RoleSelection');
        },
      },
    ]);
  };

  const handleSaveProfile = () => { // Update the user profile using updateUserProfile function from AuthContext
    updateUserProfile(currentUser.id, editData);
    setEditMode(false);
    Alert.alert('Success', 'Profile updated successfully');
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
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backButton}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.title}>My Driver Profile</Text>
            </View>

            {/* Profile Card */}
            <View style={styles.card}>
              {/* Avatar */}
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>🚗</Text>
                </View>
                <Text style={styles.userName}>{currentUser.fullName}</Text>
                <View style={styles.roleBadge}>
                  <Text style={styles.roleBadgeText}>Student Driver</Text>
                </View>
              </View>

              {/* Profile Info */}
              <View style={styles.infoSection}>
                <InfoField
                  label="Full Name"
                  value={currentUser.fullName}
                  editable={editMode}
                  onChangeText={(text) =>
                    setEditData({ ...editData, fullName: text })
                  }
                />
                <InfoField
                  label="Phone"
                  value={currentUser.phone}
                  editable={editMode}
                  onChangeText={(text) =>
                    setEditData({ ...editData, phone: text })
                  }
                />
                {/* Email and plaintext Student ID are intentionally hidden */}
              </View>

              {/* Vehicle Info */}
              <View style={styles.vehicleSection}>
                <Text style={styles.sectionTitle}>Vehicle Information</Text>
                <InfoField
                  label="Vehicle Type"
                  value={currentUser.vehicleType}
                  editable={editMode}
                  onChangeText={(text) =>
                    setEditData({ ...editData, vehicleType: text })
                  }
                />
                {/* License plate and driver license text are hidden; documents remain available in admin review */}
              </View>

              {/* Verification Status */}
              <View style={styles.statusSection}>
                <Text style={styles.statusLabel}>Verification Status</Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: currentUser.verified ? '#27AE60' : '#F39C12',
                    },
                  ]}
                >
                  <Text style={styles.statusBadgeText}>
                    {currentUser.verified ? '✓ Verified' : '⏳ Pending'}
                  </Text>
                </View>
              </View>

              {/* Driver Stats */}
              <View style={styles.statsContainer}>
                <StatCard label="Rides Completed" value="0" />
                <StatCard label="Rating" value="5.0" />
                <StatCard label="Reviews" value="0" />
              </View>

              {/* Buttons */}
              <View style={styles.buttonGroup}>
                {!editMode ? (
                  <>
                    <TouchableOpacity
                      style={[styles.button, styles.editButton]}
                      onPress={() => setEditMode(true)}
                    >
                      <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.logoutButton]}
                      onPress={handleLogout}
                    >
                      <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={[styles.button, styles.saveButton]}
                      onPress={handleSaveProfile}
                    >
                      <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={() => {
                        setEditMode(false);
                        setEditData(currentUser);
                      }}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const InfoField = ({ label, value, editable, onChangeText }) => (
  <View style={styles.infoField}>
    <Text style={styles.infoLabel}>{label}</Text>
    {editable ? (
      <View style={styles.editInput}>
        <Text style={styles.editInputText}>{value}</Text>
      </View>
    ) : (
      <Text style={styles.infoValue}>{value}</Text>
    )}
  </View>
);

const StatCard = ({ label, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

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
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  notLoggedInText: {
    color: '#fff',
    fontSize: 18,
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5A623',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: '#F5A623',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleBadgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  infoSection: {
    marginBottom: 20,
  },
  vehicleSection: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoField: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  editInputText: {
    fontSize: 14,
    color: '#333',
  },
  statusSection: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  statusBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5A623',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  buttonGroup: {
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#F5A623',
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
  },
  saveButton: {
    backgroundColor: '#27AE60',
  },
  cancelButton: {
    backgroundColor: '#95A5A6',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default DriverProfileScreen;
