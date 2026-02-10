import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([
    // Demo student (pre-verified for testing)
    {
      id: 'student-demo',
      fullName: 'John Student',
      phone: '0912345678',
      email: 'student@test.com',
      studentIdImage: 'https://via.placeholder.com/400x300?text=Student+ID',
      role: 'student',
      verified: true,
      createdAt: new Date().toISOString(),
      password: 'demo1234',
    },
    // Demo driver (pre-verified for testing)
    {
      id: 'driver-demo',
      fullName: 'Jane Driver',
      phone: '0987654321',
      email: 'driver@test.com',
      studentIdImage: 'https://via.placeholder.com/400x300?text=Student+ID',
      driverLicenseImage: 'https://via.placeholder.com/400x300?text=Driver+License',
      vehicleType: 'Toyota Vios',
      plateNumber: 'ABC-1234',
      role: 'driver',
      verified: true,
      createdAt: new Date().toISOString(),
      password: 'demo1234',
    },
  ]);
  const [admins, setAdmins] = useState([
    { id: 'admin-' + Date.now(), username: 'admin123', password: 'password123' },
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [verifiedUsers, setVerifiedUsers] = useState([]);

  const registerStudent = (studentData) => {
    const newUser = {
      id: Date.now().toString(),
      fullName: studentData.fullName,
      phone: studentData.phone,
      email: studentData.email,
      studentIdImage: studentData.studentIdImage,
      role: 'student',
      verified: false,
      createdAt: new Date().toISOString(),
      // store hashed/plain password for demo (DO NOT use plain in production)
      password: studentData.password,
    };
    setUsers((prev) => [...prev, newUser]);
    setPendingVerifications((prev) => [...prev, newUser]);
    return newUser;
  };

  const registerStudentDriver = (driverData) => {
    const newUser = {
      id: Date.now().toString(),
      fullName: driverData.fullName,
      phone: driverData.phone,
      email: driverData.email,
      studentIdImage: driverData.studentIdImage,
      driverLicenseImage: driverData.driverLicenseImage,
      vehicleType: driverData.vehicleType,
      plateNumber: driverData.plateNumber,
      role: 'driver',
      verified: false,
      createdAt: new Date().toISOString(),
      password: driverData.password,
    };
    setUsers((prev) => [...prev, newUser]);
    setPendingVerifications((prev) => [...prev, newUser]);
    return newUser;
  };

  const verifyUser = (userId, approved) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      user.verified = approved;
      setUsers([...users]);
      setPendingVerifications((prev) => prev.filter((u) => u.id !== userId));
      if (approved) setVerifiedUsers((prev) => [...prev, user]);
    }
  };

  const login = ({ emailOrUsername, password }) => {
    console.log('Login attempt:', emailOrUsername, password);
    console.log('Available users:', users);
    console.log('Available admins:', admins);
    
    // Try admin login first (by username)
    const admin = admins.find((a) => a.username === emailOrUsername && a.password === password);
    if (admin) {
      console.log('Admin login successful');
      setCurrentUser({ id: admin.id, username: admin.username, role: 'admin' });
      return { success: true, user: { id: admin.id, role: 'admin' } };
    }

    // Try user login by email
    const user = users.find((u) => u.email === emailOrUsername && u.password === password);
    if (!user) {
      console.log('User not found');
      return { success: false, message: 'Invalid email or password' };
    }
    if (!user.verified) {
      console.log('User not verified');
      return { success: false, message: 'Account not verified by admin' };
    }
    console.log('User login successful:', user);
    setCurrentUser({ ...user });
    return { success: true, user };
  };

  const logoutUser = () => setCurrentUser(null);

  const updateUserProfile = (userId, updates) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      Object.assign(user, updates);
      setUsers([...users]);
      if (currentUser?.id === userId) setCurrentUser({ ...user });
    }
  };

  const createAdmin = ({ username, password }) => {
    const exists = admins.find((a) => a.username === username);
    if (exists) return { success: false, message: 'Admin already exists' };
    const newAdmin = { id: 'admin-' + Date.now().toString(), username, password };
    setAdmins((prev) => [...prev, newAdmin]);
    return { success: true, admin: newAdmin };
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        admins,
        currentUser,
        pendingVerifications,
        verifiedUsers,
        registerStudent,
        registerStudentDriver,
        verifyUser,
        login,
        logoutUser,
        updateUserProfile,
        createAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
