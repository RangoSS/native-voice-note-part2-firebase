import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AudioRecorderApp() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [voiceNotes, setVoiceNotes] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [renameId, setRenameId] = useState('');
  const [renameText, setRenameText] = useState('');

  useEffect(() => {
    loadVoiceNotes();
  }, []);

  const loadVoiceNotes = async () => {
    const storedNotes = await AsyncStorage.getItem('voiceNotes');
    if (storedNotes) {
      setVoiceNotes(JSON.parse(storedNotes));
    }
  };

  const saveVoiceNotes = async (notes) => {
    await AsyncStorage.setItem('voiceNotes', JSON.stringify(notes));
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({ allowsRecordingIOS: true });
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        setRecording(recording);
      } else {
        alert('Permission to access microphone is required!');
      }
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const newNote = {
        id: Date.now().toString(),
        uri,
        date: new Date().toLocaleString(),
        name: `Voice Note ${voiceNotes.length + 1}`,
      };
      const updatedNotes = [newNote, ...voiceNotes];
      setVoiceNotes(updatedNotes);
      saveVoiceNotes(updatedNotes);
      setRecording(null);
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  const playVoiceNote = async (uri) => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri });
      await sound.playAsync();
      setIsPlaying(true);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Failed to play audio', error);
    }
  };

  const deleteVoiceNote = (id) => {
    const updatedNotes = voiceNotes.filter((note) => note.id !== id);
    setVoiceNotes(updatedNotes);
    saveVoiceNotes(updatedNotes);
  };

  const renameVoiceNote = (id, newName) => {
    const updatedNotes = voiceNotes.map((note) =>
      note.id === id ? { ...note, name: newName } : note
    );
    setVoiceNotes(updatedNotes);
    saveVoiceNotes(updatedNotes);
    setRenameId('');
    setRenameText('');
  };

  return (
    <LinearGradient colors={['#d9a7c7', '#fffcdc']} style={styles.container}>
      <View style={styles.recordContainer}>
        {recording ? (
          <TouchableOpacity onPress={stopRecording}>
            <Feather name="stop-circle" size={80} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecording}>
            <AntDesign name="playcircleo" size={80} color="green" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={voiceNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <TouchableOpacity onPress={() => playVoiceNote(item.uri)}>
              <AntDesign name="playcircleo" size={40} color="black" />
            </TouchableOpacity>
            <Text style={styles.noteText}>{item.name}</Text>
            <SimpleLineIcons
              name="options-vertical"
              size={24}
              color="black"
              onPress={() => setRenameId(item.id)}
            />
            {renameId === item.id && (
              <View style={styles.renameContainer}>
                <TextInput
                  style={styles.input}
                  value={renameText}
                  onChangeText={setRenameText}
                  placeholder="Rename note"
                />
                <TouchableOpacity onPress={() => renameVoiceNote(item.id, renameText)}>
                  <Text>Rename</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteVoiceNote(item.id)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  recordContainer: { alignItems: 'center', marginVertical: 20 },
  noteContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  noteText: { flex: 1, fontSize: 16, marginHorizontal: 10 },
  renameContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { borderBottomWidth: 1, width: 100, marginRight: 5 },
});
