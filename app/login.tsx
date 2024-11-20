import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router'; // Expo router for navigation
import { LinearGradient } from 'expo-linear-gradient'; // Gradient background

const Login = () => {
  // State hooks for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission (currently just logs the email and password)
  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    // Here you would typically handle authentication logic (API call)
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f5d']} // Gradient colors
      style={styles.container}>
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
