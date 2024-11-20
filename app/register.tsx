import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig'; // Import Firebase auth and Firestore
import { LinearGradient } from 'expo-linear-gradient';

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [status, setStatus] = useState('active'); // Default status

  const handleRegister = async () => {
    if (
      !email ||
      !password ||
      !username ||
      !displayName ||
      !phone ||
      !address ||
      !country
    ) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        username,
        displayName,
        phone,
        address,
        country,
        role,
        status,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'User registered successfully!');
    } catch (error: any) {
      console.error('Error registering user:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']} // Gradient colors
      style={styles.container}
    >
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        placeholderTextColor="#ccc"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#ccc"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#ccc"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        placeholderTextColor="#ccc"
        value={country}
        onChangeText={setCountry}
      />
      <Button title="Register" onPress={handleRegister} color="#3b5998" />
      <TouchableOpacity
        style={styles.link}
        onPress={() => {
          // Navigate to login screen
          Alert.alert('Redirect', 'Navigate to Login Screen');
        }}
      >
        <Text style={styles.linkText}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: '#000',
  },
  link: {
    marginTop: 10,
    alignSelf: 'center',
  },
  linkText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
