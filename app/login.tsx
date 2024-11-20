import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router'; // Expo router for navigation
import { LinearGradient } from 'expo-linear-gradient'; // Gradient background
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth, db } from '../config/firebaseConfig'; // Firebase configuration

import { useRouter } from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter(); // Use router for navigation
  // Handle login
  const handleLogin = async () => {
    try {
      // Sign in using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get the user data from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();

        // Save user data and token in AsyncStorage
        await AsyncStorage.setItem('userToken', userCredential.user.accessToken); // Save the Firebase user token
        await AsyncStorage.setItem('userId', user.uid); // Save user ID
        await AsyncStorage.setItem('userData', JSON.stringify(userData)); // Save user data

        console.log('User data:', userData); // Log the user data to the console

        // Navigate to the home page or another screen after successful login
        router.push('/home');
      } else {
        Alert.alert('Error', 'User data not found!');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      Alert.alert('Error', 'Invalid credentials or an error occurred.');
    }
  };

  return (
    <LinearGradient colors={['#d9a7c7', '#fffcdc']} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Login</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Login Button */}
        <Button title="Login" onPress={handleLogin} />

        {/* Link to Register page */}
        <TouchableOpacity style={styles.registerLink}>
          <Link href="/register">
            <Text style={styles.linkText}>Don't have an account? Register</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  registerLink: {
    marginTop: 10,
  },
  linkText: {
    color: '#3b5998',
    textDecorationLine: 'underline',
  },
});

export default Login;
