import { BlurView } from "expo-blur";
import { CameraView, useCameraPermissions } from "expo-camera";
import { SwitchCamera, X, Zap, ZapOff } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

interface CameraCaptureProps {
  onCapture: (uri: string) => void;
  onClose: () => void;
}

export default function CameraCapture({
  onCapture,
  onClose,
}: CameraCaptureProps) {
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [flash, setFlash] = useState<"off" | "on">("off");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View style={styles.loadingContainer} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <BlurView intensity={20} tint="dark" style={styles.permissionCard}>
          <Text style={styles.permissionTitle}>Camera Access</Text>
          <Text style={styles.permissionMessage}>
            We need your permission to capture photos for your canvas.
          </Text>
          <TouchableOpacity
            onPress={requestPermission}
            style={styles.permissionButton}
          >
            <Text style={styles.permissionButtonText}>Allow Access</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleFlash() {
    setFlash((current) => (current === "off" ? "on" : "off"));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        onCapture(photo.uri);
      }
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        enableTorch={flash === "on"}
        ref={cameraRef}
      >
        <SafeAreaView style={styles.safeArea}>
          <Animated.View entering={FadeIn.delay(300)} style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.blurIconButton}>
              <X color="white" size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleFlash}
              style={styles.blurIconButton}
            >
              {flash === "on" ? (
                <Zap color="#FFCC00" size={24} />
              ) : (
                <ZapOff color="white" size={24} />
              )}
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(500)} style={styles.footer}>
            <TouchableOpacity
              style={styles.sideButton}
              onPress={toggleCameraFacing}
            >
              <SwitchCamera color="white" size={28} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButtonContainer}
              onPress={takePicture}
            >
              <View style={styles.captureButtonOuter}>
                <View style={styles.captureButtonInner} />
              </View>
            </TouchableOpacity>

            <View style={styles.sideButton} />
          </Animated.View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  blurIconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  captureButtonContainer: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "white",
  },
  sideButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  permissionCard: {
    padding: 30,
    borderRadius: 30,
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 15,
  },
  permissionMessage: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  permissionButtonText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 16,
  },
});
