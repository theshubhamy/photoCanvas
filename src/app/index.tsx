import { Stack, useRouter } from "expo-router";
import { Camera as CameraIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "PhotoCanvas",
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View style={styles.hero}>
        <Text style={styles.title}>Interactive Photo Canvas</Text>
        <Text style={styles.subtitle}>Capture, Draw, and Add Stickers!</Text>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => router.push("/camera")}
      >
        <CameraIcon color="white" size={32} />
        <Text style={styles.startButtonText}>Start Creating</Text>
      </TouchableOpacity>

      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Ready to Create?</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Capture a photo to start editing with stickers and freehand drawing.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  hero: {
    marginTop: 40,
    marginBottom: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 20,
    gap: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  startButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  previewContainer: {
    marginTop: 60,
    flex: 1,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  emptyState: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyStateText: {
    color: "#999",
    textAlign: "center",
  },
});
