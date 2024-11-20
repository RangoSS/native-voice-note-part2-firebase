import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation

const Home: React.FC = () => {
  const navigation = useNavigation(); // Define navigation here

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#d9a7c7', '#fffcdc']} style={styles.gradient}>
        <View style={styles.header}>
          <AntDesign name="barschart" size={24} color="black" />
          <Text style={styles.title}>Bambo Voice Hub</Text>
          <Entypo name="menu" size={24} color="black" />
        </View>

        <View style={styles.menuContainer}>
          <Pressable style={styles.press} onPress={() => navigation.navigate('profile')}>
            <View style={styles.sec1}>
              <FontAwesome5 name="users" size={24} color="black" />
            </View>
            <Text style={styles.text_list}>View Profile</Text>
          </Pressable>

          <Pressable style={styles.press} onPress={() => navigation.navigate('features')}>
            <View style={styles.sec1}>
              <Ionicons name="checkmark-done" size={24} color="black" />
            </View>
            <Text style={styles.text_list}>Features</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  menuContainer: {
    marginTop: 20,
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'space-evenly', // Distribute space evenly between buttons
    alignItems: 'center',
  },
  sec1: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  press: {
    alignItems: 'center',
  },
  text_list: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Home;
