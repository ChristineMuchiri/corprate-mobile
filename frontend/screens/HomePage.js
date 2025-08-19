import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { API_BASE_URL } from '@env';

const FeedPage = ({ onPost }) => {
  const [text, setText] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [gifUri, setGifUri] = useState(null);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePickGif = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/gif",
    });
    if (result.type === "success") {
      setGifUri(result.uri);
    }
  };

  
  const handlePost = async () => {
  if (!text.trim() && !imageUri && !gifUri) return;

  try {
    const payload = {
      type: "FreeThought",
      text,
      imageUri,   // optional
      gifUri,     // optional
    };

    const response = await fetch(`${API_BASE_URL}/write-reviews/freethought`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to post: ${response.status}`);
    }

    const result = await response.json();
    console.log("Posted successfully:", result);

    // reset
    setText("");
    setImageUri(null);
    setGifUri(null);
  } catch (err) {
    console.error("Error posting free thought:", err);
    alert("❌ Could not post. Please try again.");
  }
};


  return (
    <View style={styles.maincontainer}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="account-circle" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>CorpRate</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="search" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="notifications-none" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Free Thoughts Input Card */}
      <View style={styles.container}>
        {/* Input row */}
        <View style={styles.inputRow}>
          <Icon
            name="chat-bubble-outline"
            size={22}
            color="#00b4d8"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="💭 What's on your mind?"
            placeholderTextColor="#555"
            value={text}
            onChangeText={setText}
            multiline
          />
        </View>

        {/* Preview */}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
        {gifUri && <Image source={{ uri: gifUri }} style={styles.previewImage} />}

        {/* Actions row */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handlePickImage}>
            <Icon name="photo-camera" size={20} color="#bbb" />
            <Text style={styles.actionText}>Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handlePickGif}>
            <Icon name="gif" size={20} color="#bbb" />
            <Text style={styles.actionText}>GIF</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Icon name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#0b0d16", // dark theme
  },
  // Header bar
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#0b0d16",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
  },
  iconBtn: {
    marginLeft: 12,
  },

  // Free Thoughts card
  container: {
    backgroundColor: "#002b36",
    margin: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#00b4d8",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
    marginTop: 4,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#fff",
    maxHeight: 100,
  },
  previewImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginTop: 8,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    color: "#bbb",
    marginLeft: 4,
    fontSize: 13,
  },
  postBtn: {
    backgroundColor: "#00b4d8",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FeedPage;
