import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import CanvasEditor from "../components/CanvasEditor";

export default function EditorScreen() {
  const router = useRouter();
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();

  const handleSave = (uri: string) => {
    router.replace("/");
  };

  const handleDiscard = () => {
    router.back();
  };

  if (!imageUri) {
    return null;
  }

  return (
    <CanvasEditor
      imageUri={imageUri}
      onSave={handleSave}
      onDiscard={handleDiscard}
    />
  );
}
