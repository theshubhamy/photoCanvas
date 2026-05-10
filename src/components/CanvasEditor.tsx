import {
  Canvas,
  Path,
  SkPath,
  Skia,
  Image as SkiaImage,
  useImage,
} from "@shopify/react-native-skia";
import { BlurView } from "expo-blur";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import {
  Download,
  Pencil,
  Redo2,
  Sticker as StickerIcon,
  Trash2,
  Undo2,
  X
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeInDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { captureRef } from "react-native-view-shot";
import StickerPicker from "./StickerPicker";

const { width, height } = Dimensions.get("window");

interface PathData {
  path: SkPath;
  color: string;
  width: number;
}

interface StickerData {
  id: string;
  source: any;
}

interface CanvasEditorProps {
  imageUri: string;
  onSave: (uri: string) => void;
  onDiscard: () => void;
}

export default function CanvasEditor({
  imageUri,
  onSave,
  onDiscard,
}: CanvasEditorProps) {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [redoStack, setRedoStack] = useState<PathData[]>([]);
  const [stickers, setStickers] = useState<StickerData[]>([]);
  const [isStickerPickerVisible, setStickerPickerVisible] = useState(false);
  const [mode, setMode] = useState<"draw" | "sticker">("draw");

  const bgImage = useImage(imageUri);
  const containerRef = useRef<View>(null);

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  // Drawing Logic
  const startPath = (x: number, y: number) => {
    const newPath = Skia.Path.Make();
    newPath.moveTo(x, y);
    setPaths((prev) => [
      ...prev,
      { path: newPath, color: "#FF3B30", width: 5 },
    ]);
    setRedoStack([]); // Clear redo stack on new action
  };

  const updatePath = (x: number, y: number) => {
    setPaths((prev) => {
      const last = prev[prev.length - 1];
      if (!last) return prev;
      last.path.lineTo(x, y);
      return [...prev.slice(0, prev.length - 1), last];
    });
  };

  const drawGesture = Gesture.Pan()
    .enabled(mode === "draw")
    .onStart((e) => {
      runOnJS(startPath)(e.x, e.y);
    })
    .onUpdate((e) => {
      runOnJS(updatePath)(e.x, e.y);
    });

  const undo = () => {
    if (paths.length === 0) return;
    const last = paths[paths.length - 1];
    setRedoStack((prev) => [...prev, last]);
    setPaths((prev) => prev.slice(0, prev.length - 1));
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const last = redoStack[redoStack.length - 1];
    setPaths((prev) => [...prev, last]);
    setRedoStack((prev) => prev.slice(0, prev.length - 1));
  };

  const addSticker = (source: any) => {
    const newSticker: StickerData = {
      id: Date.now().toString(),
      source,
    };
    setStickers([...stickers, newSticker]);
    setMode("sticker");
  };

  const clearCanvas = () => {
    setPaths([]);
    setRedoStack([]);
    setStickers([]);
  };

  const saveImage = async () => {
    try {
      if (!permissionResponse?.granted) {
        const { granted } = await requestPermission();
        if (!granted) {
          Alert.alert(
            "Permission Required",
            "We need access to your gallery to save the photo.",
          );
          return;
        }
      }

      if (containerRef.current) {
        const uri = await captureRef(containerRef, {
          format: "png",
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(uri);

        Alert.alert("Success!", "Saved to your gallery.", [
          { text: "Share", onPress: () => Sharing.shareAsync(uri) },
          { text: "Back to Home", onPress: () => onSave(uri) },
        ]);
      }
    } catch (error) {
      console.error("Error saving image:", error);
      Alert.alert("Error", "Failed to save image.");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
          <TouchableOpacity onPress={onDiscard} style={styles.iconButton}>
            <X color="white" size={24} />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={undo}
              disabled={paths.length === 0}
              style={[
                styles.iconButton,
                paths.length === 0 && styles.disabledButton,
              ]}
            >
              <Undo2 color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={redo}
              disabled={redoStack.length === 0}
              style={[
                styles.iconButton,
                redoStack.length === 0 && styles.disabledButton,
              ]}
            >
              <Redo2 color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={clearCanvas} style={styles.iconButton}>
              <Trash2 color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={saveImage}
              style={[styles.iconButton, styles.saveButton]}
            >
              <Download color="white" size={24} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View
          style={styles.canvasContainer}
          ref={containerRef}
          collapsable={false}
        >
          <GestureDetector gesture={drawGesture}>
            <Canvas style={styles.canvas}>
              {bgImage && (
                <SkiaImage
                  image={bgImage}
                  x={0}
                  y={0}
                  width={width - 20}
                  height={height - 220}
                  fit="cover"
                />
              )}
              {paths.map((p, i) => (
                <Path
                  key={i}
                  path={p.path}
                  color={p.color}
                  style="stroke"
                  strokeWidth={p.width}
                  strokeCap="round"
                />
              ))}
            </Canvas>
          </GestureDetector>

          {/* Interactive Stickers Layer (Overlay) */}
          {stickers.map((sticker) => (
            <InteractiveSticker key={sticker.id} source={sticker.source} />
          ))}
        </View>

        <Animated.View
          entering={FadeInDown.delay(300)}
          style={styles.toolbarWrapper}
        >
          <BlurView intensity={40} tint="dark" style={styles.toolbar}>
            <TouchableOpacity
              onPress={() => setMode("draw")}
              style={[styles.tool, mode === "draw" && styles.activeTool]}
            >
              <Pencil color={mode === "draw" ? "#007AFF" : "#fff"} size={24} />
              <Text
                style={[
                  styles.toolText,
                  mode === "draw" && styles.activeToolText,
                ]}
              >
                Draw
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setStickerPickerVisible(true)}
              style={[styles.tool, mode === "sticker" && styles.activeTool]}
            >
              <StickerIcon
                color={mode === "sticker" ? "#007AFF" : "#fff"}
                size={24}
              />
              <Text
                style={[
                  styles.toolText,
                  mode === "sticker" && styles.activeToolText,
                ]}
              >
                Sticker
              </Text>
            </TouchableOpacity>
          </BlurView>
        </Animated.View>

        <StickerPicker
          visible={isStickerPickerVisible}
          onClose={() => setStickerPickerVisible(false)}
          onSelect={addSticker}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

function InteractiveSticker({ source }: { source: any }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });

  const dragGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((e) => {
      translateX.value = context.value.x + e.translationX;
      translateY.value = context.value.y + e.translationY;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureDetector gesture={dragGesture}>
      <Animated.View style={[styles.stickerContainer, animatedStyle]}>
        <Image source={source} style={styles.stickerImage} />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    zIndex: 100,
  },
  headerRight: {
    flexDirection: "row",
    gap: 10,
  },
  canvasContainer: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 110,
  },
  canvas: {
    width: width - 20,
    height: height - 220,
  },
  toolbarWrapper: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    height: 90,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  toolbar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tool: {
    alignItems: "center",
    padding: 15,
    borderRadius: 20,
  },
  activeTool: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  toolText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  activeToolText: {
    color: "#007AFF",
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  disabledButton: {
    opacity: 0.3,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  stickerContainer: {
    position: "absolute",
    top: "40%",
    left: "40%",
    width: 130,
    height: 130,
    zIndex: 100,
  },
  stickerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
