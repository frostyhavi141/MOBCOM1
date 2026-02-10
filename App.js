import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';

// Import screens
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import StudentRegistrationScreen from './screens/StudentRegistrationScreen';
import StudentDriverRegistrationScreen from './screens/StudentDriverRegistrationScreen';
import AdminVerificationScreen from './screens/AdminVerificationScreen';
import AdminProfileScreen from './screens/AdminProfileScreen';
import StudentProfileScreen from './screens/StudentProfileScreen';
import DriverProfileScreen from './screens/DriverProfileScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="RoleSelection"
        component={RoleSelectionScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="StudentReg"
        component={StudentRegistrationScreen}
        options={{ animationEnabled: true }}
      />
      <Stack.Screen
        name="DriverReg"
        component={StudentDriverRegistrationScreen}
        options={{ animationEnabled: true }}
      />
      <Stack.Screen
        name="AdminVerification"
        component={AdminVerificationScreen}
        options={{ animationEnabled: true }}
      />
      <Stack.Screen
        name="AdminProfile"
        component={AdminProfileScreen}
        options={{ animationEnabled: true }}
      />
      <Stack.Screen
        name="StudentProfile"
        component={StudentProfileScreen}
        options={{ animationEnabled: true }}
      />
      <Stack.Screen
        name="DriverProfile"
        component={DriverProfileScreen}
        options={{ animationEnabled: true }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ animationEnabled: true }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </AuthProvider>
  );
}

const COLORS = {
  navy: '#0F2854',
  blue: '#1C4D8D',
  sky: '#4988C4',
  ice: '#BDE8F5',
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,40,84,0.35)',
  },
  container: {
    paddingHorizontal: 18,
    paddingBottom: 30,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: '78%',
    height: 110,
  },
  card: {
    width: '100%',
    maxWidth: 430,
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: 'rgba(189,232,245,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(189,232,245,0.65)',
    elevation: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.blue,
    textAlign: 'center',
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 6,
  },
  input: {
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(73,136,196,0.45)',
    color: COLORS.navy,
    fontSize: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  eyeBtn: {
    height: 52,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
  },
  eyeText: {
    color: COLORS.blue,
    fontWeight: '800',
  },
  primaryBtn: {
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  primaryBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 14,
    color: COLORS.navy,
    fontWeight: '700',
  },
  loginLink: {
    color: COLORS.blue,
    fontWeight: '900',
    textDecorationLine: 'underline',
  },
  terms: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    color: 'rgba(15,40,84,0.85)',
  },
  link: {
    color: COLORS.blue,
    fontWeight: '900',
    textDecorationLine: 'underline',
  },
});

