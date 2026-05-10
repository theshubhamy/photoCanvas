# PhotoCanvas 🎨

PhotoCanvas is a premium, interactive photo editing application built with **Expo**, **React Native Skia**, and **Reanimated**. It allows users to capture photos, unleash their creativity with freehand drawing, and add vibrant project status stickers to their canvas.

## 🌟 Features

- **📸 Professional Camera**: Capture high-quality photos with integrated flash and camera switching controls.
- **🖌️ Skia-Powered Canvas**: Smooth, high-performance freehand drawing with customizable brush strokes.
- **🎭 Sticker Library**: A collection of over 80+ "Project Status" stickers with interactive drag-and-drop functionality.
- **↩️ Undo/Redo System**: Full history support for drawing, allowing you to perfect your artwork step-by-step.
- **💾 Export & Share**: Save your final masterpiece directly to your device's gallery or share it instantly.
- **✨ Premium UI/UX**: Modern dark-mode aesthetic with glassmorphism effects and smooth entrance animations.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Graphics**: [@shopify/react-native-skia](https://shopify.github.io/react-native-skia/)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Gestures**: [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- **Icons**: [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)
- **Export**: [react-native-view-shot](https://github.com/gre/react-native-view-shot)

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js and the Expo CLI installed.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd photoCanvas
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

## 📁 Project Structure

```text
src/
├── app/               # Expo Router screens (Home, Camera, Editor)
├── components/        # Reusable UI components
│   ├── CameraCapture.tsx
│   ├── CanvasEditor.tsx
│   └── StickerPicker.tsx
assets/
├── stickers/          # 80+ Premium sticker assets
└── images/            # App backgrounds and icons
```

## 📜 License

This project is licensed under the MIT License.
