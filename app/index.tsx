import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView, 
} from "react-native";
import { useRouter } from "expo-router";

export default function LandingScreen() {
  const router = useRouter();

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}  // For proper content layout
      showsVerticalScrollIndicator={false}  // For Hide scroll bar
    >
      {/* App Name */}
      <Text style={styles.title}>NoteFlow</Text>

      {/* Features Section */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureCard}>
          <View style={styles.subCard}>
            <Text style={styles.featureTitle}>Add Notes</Text>
            <Text style={styles.featureDesc}>
              Quickly jot down your thoughts and ideas with our NoteFlow
            </Text>
          </View>

          <Image
            source={{
              uri: "https://cdn-icons-png.freepik.com/256/14/14520.png",
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Edit Notes</Text>
          <Text style={styles.featureDesc}>
            Refine your work with Edit Notes
          </Text>

          <Image
            source={{
              uri: "https://cdn2.iconfinder.com/data/icons/clipboard-2/100/clipboard9-512.png",
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Delete Notes</Text>
          <Text style={styles.featureDesc}>
            Clear the clutter with Delete Notes
          </Text>

          <Image
            source={{
              uri: "https://cdn4.iconfinder.com/data/icons/content-24/30/content-notes-remove-512.png",
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Let's Explore</Text>
      </TouchableOpacity>
    </ScrollView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
  },
  scrollContent: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    paddingVertical: 40, 
  },
  title: { 
    fontSize: 36, 
    fontWeight: "bold", 
    color: "#2c3e50", 
    marginTop: 10 
  },
  featuresContainer: { 
    width: "80%", 
    marginVertical: 10 
  },
  featureCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    marginTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    paddingTop: 30,
    alignItems: "center"
  },
  subCard: {
    justifyContent: "center",
    alignItems: "center"
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 5,
  },
  featureDesc: { 
    fontSize: 14, 
    color: "#7f8c8d" 
  },
  image: { 
    width: 150, 
    height: 80, 
    marginVertical: 20 
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 30,
    marginTop: 20, 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
});