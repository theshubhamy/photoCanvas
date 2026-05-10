import { useRouter } from "expo-router";
import React from "react";
import CameraCapture from "../components/CameraCapture";

export default function CameraScreen() {
  const router = useRouter();

  const handleCapture = (uri: string) => {
    router.push({
      pathname: "/editor",
      params: { imageUri: uri },
    });
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <>
      <CameraCapture onCapture={handleCapture} onClose={handleClose} />
    </>
  );
}
