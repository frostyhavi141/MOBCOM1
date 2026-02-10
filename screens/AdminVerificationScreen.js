import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  Alert,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

const AdminVerificationScreen = ({ navigation }) => {
  const { pendingVerifications, verifyUser, users, logoutUser } = useContext(AuthContext); //get pendingVerifications, verifyUser function, users array and logoutUser function from AuthContext
  const [activeTab, setActiveTab] = useState('pending');// State to manage active tab (pending or verified)
  const [selectedImage, setSelectedImage] = useState(null); // State to manage selected image for modal preview
  const [imageModalVisible, setImageModalVisible] = useState(false); // State to manage visibility of image modal

  const handleLogout = () => {// Handle logout with confirmation
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          logoutUser();// Clear user session and navigate to RoleSelection screen
          navigation.replace('RoleSelection');
        },
      },
    ]);
  };

  const handleApprove = (userId) => {// Handle user approval with confirmation
    Alert.alert('Approve User', 'Are you sure you want to approve this user?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Approve',
        onPress: () => {
          verifyUser(userId, true);
          Alert.alert('Success', 'User has been approved');
        },
      },
    ]);
  };

  const handleReject = (userId) => {// Handle user rejection with confirmation
    Alert.alert('Reject User', 'Are you sure you want to reject this user?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Reject',
        onPress: () => {
          verifyUser(userId, false);
          Alert.alert('Success', 'User has been rejected');
        },
      },
    ]);
  };

  const verifiedUsers = users.filter(u => u.verified); //seperate list of verified users for the "Verified" tab.

  const renderUserCard = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.userName}>{item.fullName}</Text>
        <View
          style={[
            styles.roleBadge,
            {
              backgroundColor: item.role === 'driver' ? '#F5A623' : '#4A90E2',
            },
          ]}
        >
          <Text style={styles.roleBadgeText}>
            {item.role === 'driver' ? '🚗 Driver' : '👤 Student'}
          </Text>
        </View>
      </View>

      <View style={styles.cardDetails}>
        {/* Do not display email or passwords. Show limited contact and vehicle info only. */}
        <DetailRow label="Phone" value={item.phone} />
        {item.role === 'driver' && (
          <>
            <DetailRow label="Vehicle" value={item.vehicleType} />
            <DetailRow label="Plate" value={item.plateNumber} />
          </>
        )}
      </View>

      {/* Document Preview */}
      <View style={styles.documentsSection}>
        <Text style={styles.documentsTitle}>Documents</Text>
        <View style={styles.documentsList}>
          {item.studentIdImage && (
            <TouchableOpacity
              style={styles.documentPreview}
              onPress={() => {
                setSelectedImage(item.studentIdImage);
                setImageModalVisible(true);
              }}
            >
              <Image
                source={{ uri: item.studentIdImage }}
                style={styles.documentThumbnail}
              />
              <Text style={styles.documentLabel}>Student ID</Text>
            </TouchableOpacity>
          )}
          {item.driverLicenseImage && (
            <TouchableOpacity
              style={styles.documentPreview}
              onPress={() => {
                setSelectedImage(item.driverLicenseImage);
                setImageModalVisible(true);
              }}
            >
              <Image
                source={{ uri: item.driverLicenseImage }}
                style={styles.documentThumbnail}
              />
              <Text style={styles.documentLabel}>Driver License</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {activeTab === 'pending' && (
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.approveButton]}
            onPress={() => handleApprove(item.id)}
          >
            <Text style={styles.buttonText}>✓ Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() => handleReject(item.id)}
          >
            <Text style={styles.buttonText}>✕ Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

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
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <View>
                  <Text style={styles.title}>Admin Dashboard</Text>
                  <Text style={styles.subtitle}>Manage pending verifications</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TouchableOpacity
                    style={styles.adminButton}
                    onPress={() => navigation.navigate('AdminProfile')}
                  >
                    <Text style={styles.logoutButtonText}>Admins</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                  >
                    <Text style={styles.logoutButtonText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
                onPress={() => setActiveTab('pending')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'pending' && styles.activeTabText,
                  ]}
                >
                  Pending ({pendingVerifications.length})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'verified' && styles.activeTab]}
                onPress={() => setActiveTab('verified')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'verified' && styles.activeTabText,
                  ]}
                >
                  Verified ({verifiedUsers.length})
                </Text>
              </TouchableOpacity>
            </View>

            {/* User List */}
            {activeTab === 'pending' ? (
              <FlatList
                data={pendingVerifications}
                renderItem={renderUserCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No pending verifications</Text>
                  </View>
                }
              />
            ) : (
              <FlatList
                data={verifiedUsers}
                renderItem={renderUserCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No verified users</Text>
                  </View>
                }
              />
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* Image Modal */}
      <Modal
        visible={imageModalVisible}
        transparent
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setImageModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕ Close</Text>
            </TouchableOpacity>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.fullImage}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  adminButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  activeTabText: {
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  cardDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#27AE60',
  },
  rejectButton: {
    backgroundColor: '#E74C3C',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#fff',
  },
  documentsSection: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  documentsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  documentsList: {
    flexDirection: 'row',
    gap: 10,
  },
  documentPreview: {
    flex: 1,
    alignItems: 'center',
  },
  documentThumbnail: {
    width: '100%',
    height: 80,
    borderRadius: 6,
    marginBottom: 6,
    backgroundColor: '#e0e0e0',
  },
  documentLabel: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});

export default AdminVerificationScreen;
