import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, Modal, SafeAreaView, Text, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Search } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const STICKERS = [
  require('@/assets/stickers/Group 100.png'),
  require('@/assets/stickers/Group 101.png'),
  require('@/assets/stickers/Group 102.png'),
  require('@/assets/stickers/Group 103.png'),
  require('@/assets/stickers/Group 104.png'),
  require('@/assets/stickers/Group 105.png'),
  require('@/assets/stickers/Group 106.png'),
  require('@/assets/stickers/Group 107.png'),
  require('@/assets/stickers/Group 108.png'),
  require('@/assets/stickers/Group 109.png'),
  require('@/assets/stickers/Group 110.png'),
  require('@/assets/stickers/Group 111.png'),
  require('@/assets/stickers/Group 112.png'),
  require('@/assets/stickers/Group 113.png'),
  require('@/assets/stickers/Group 114.png'),
  require('@/assets/stickers/Group 115.png'),
  require('@/assets/stickers/Group 117.png'),
  require('@/assets/stickers/Group 118.png'),
  require('@/assets/stickers/Group 119.png'),
  require('@/assets/stickers/Group 120.png'),
  require('@/assets/stickers/Group 121.png'),
  require('@/assets/stickers/Group 122.png'),
  require('@/assets/stickers/Group 41.png'),
  require('@/assets/stickers/Group 42.png'),
  require('@/assets/stickers/Group 43.png'),
  require('@/assets/stickers/Group 44.png'),
  require('@/assets/stickers/Group 45.png'),
  require('@/assets/stickers/Group 46.png'),
  require('@/assets/stickers/Group 47.png'),
  require('@/assets/stickers/Group 48.png'),
  require('@/assets/stickers/Group 49.png'),
  require('@/assets/stickers/Group 50.png'),
  require('@/assets/stickers/Group 51.png'),
  require('@/assets/stickers/Group 52.png'),
  require('@/assets/stickers/Group 53.png'),
  require('@/assets/stickers/Group 54.png'),
  require('@/assets/stickers/Group 55.png'),
  require('@/assets/stickers/Group 56.png'),
  require('@/assets/stickers/Group 57.png'),
  require('@/assets/stickers/Group 58.png'),
  require('@/assets/stickers/Group 59.png'),
  require('@/assets/stickers/Group 60.png'),
  require('@/assets/stickers/Group 61.png'),
  require('@/assets/stickers/Group 62.png'),
  require('@/assets/stickers/Group 63.png'),
  require('@/assets/stickers/Group 64.png'),
  require('@/assets/stickers/Group 65.png'),
  require('@/assets/stickers/Group 66.png'),
  require('@/assets/stickers/Group 67.png'),
  require('@/assets/stickers/Group 68.png'),
  require('@/assets/stickers/Group 69.png'),
  require('@/assets/stickers/Group 70.png'),
  require('@/assets/stickers/Group 71.png'),
  require('@/assets/stickers/Group 72.png'),
  require('@/assets/stickers/Group 73.png'),
  require('@/assets/stickers/Group 74.png'),
  require('@/assets/stickers/Group 75.png'),
  require('@/assets/stickers/Group 76.png'),
  require('@/assets/stickers/Group 77.png'),
  require('@/assets/stickers/Group 78.png'),
  require('@/assets/stickers/Group 79.png'),
  require('@/assets/stickers/Group 80.png'),
  require('@/assets/stickers/Group 81.png'),
  require('@/assets/stickers/Group 82.png'),
  require('@/assets/stickers/Group 83.png'),
  require('@/assets/stickers/Group 84.png'),
  require('@/assets/stickers/Group 85.png'),
  require('@/assets/stickers/Group 86.png'),
  require('@/assets/stickers/Group 87.png'),
  require('@/assets/stickers/Group 88.png'),
  require('@/assets/stickers/Group 89.png'),
  require('@/assets/stickers/Group 90.png'),
  require('@/assets/stickers/Group 91.png'),
  require('@/assets/stickers/Group 92.png'),
  require('@/assets/stickers/Group 93.png'),
  require('@/assets/stickers/Group 94.png'),
  require('@/assets/stickers/Group 96.png'),
  require('@/assets/stickers/Group 97.png'),
  require('@/assets/stickers/Group 98.png'),
  require('@/assets/stickers/Group 99.png'),
];

interface StickerPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (stickerSource: any) => void;
}

export default function StickerPicker({ visible, onClose, onSelect }: StickerPickerProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
          <SafeAreaView style={styles.container}>
            <View style={styles.handle} />
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Project Status</Text>
                <Text style={styles.subtitle}>80 Premium Stickers</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X color="#fff" size={20} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={STICKERS}
              numColumns={4}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <Animated.View entering={FadeInDown.delay(index * 10).duration(400)}>
                  <TouchableOpacity
                    style={styles.stickerItem}
                    onPress={() => {
                      onSelect(item);
                      onClose();
                    }}
                  >
                    <Image source={item} style={styles.stickerImage} />
                  </TouchableOpacity>
                </Animated.View>
              )}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          </SafeAreaView>
        </BlurView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurContainer: {
    height: '75%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '600',
    marginTop: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  stickerItem: {
    width: (width - 60) / 4,
    height: (width - 60) / 4,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  stickerImage: {
    width: '75%',
    height: '75%',
    resizeMode: 'contain',
  },
});
