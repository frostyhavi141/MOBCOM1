import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RoleSelectionScreen = ({ navigation }) => {
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
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/student-pasabay-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.appTitle}>Student Pasabay</Text>
              <Text style={styles.subtitle}>Ride-sharing for Students</Text>
            </View>

            {/* Spacing */}
            <View style={{ flex: 1 }} />

            {/* Role Selection Cards */}
            <View style={styles.cardContainer}>
              {/* Student Option */}
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('StudentReg')}
                activeOpacity={0.8}
              >
                <View style={[styles.cardIcon, { backgroundColor: '#4A90E2' }]}>
                  <Text style={styles.cardIconText}>👤</Text>
                </View>
                <Text style={styles.cardTitle}>I'm a Student</Text>
                <Text style={styles.cardDescription}>
                  Looking for a ride to campus
                </Text>
              </TouchableOpacity>

              {/* Driver Option */}
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('DriverReg')}
                activeOpacity={0.8}
              >
                <View style={[styles.cardIcon, { backgroundColor: '#F5A623' }]}>
                  <Text style={styles.cardIconText}>🚗</Text>
                </View>
                <Text style={styles.cardTitle}>I'm a Student Driver</Text>
                <Text style={styles.cardDescription}>
                  Offering rides to other students
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Have an account?{' '}
                <Text
                  style={styles.loginLink}
                  onPress={() => navigation.navigate('Login')}
                >
                  Login Here
                </Text>
              </Text>
            </View>
          </View>
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
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  cardContainer: {
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIconText: {
    fontSize: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 13,
    color: '#e0e0e0',
  },
  loginLink: {
    color: '#FFD700',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default RoleSelectionScreen;
