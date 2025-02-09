import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  Platform,
} from 'react-native';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');

type SizeType = 'mini' | 'small' | 'medium' | 'large';

type CustomSliderProps = {
  images: string[];
  size?: SizeType;
  destination?: string;
  titre?: string;
};

const SIZES: Record<SizeType, { width: number; height: number; padding: number; borderRadius: number }> = {
  mini: {
    width: width * 0.42,
    height: width * 0.42 * 1.2,
    padding: 5,
    borderRadius: 8,
  },
  small: {
    width: width * 0.7,
    height: width * 0.7 * 1.2,
    padding: 10,
    borderRadius: 10,
  },
  medium: {
    width: width - 40,
    height: (width - 40) * 1.2,
    padding: 15,
    borderRadius: 15,
  },
  large: {
    width: width - 20,
    height: (width - 20) * 1.2,
    padding: 20,
    borderRadius: 20,
  },
};

const CustomSlider: React.FC<CustomSliderProps> = ({ images, size = 'medium', destination, titre }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);
  
  const currentSize = SIZES[size] || SIZES.medium;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoScrolling && images.length > 1) {
      interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        scrollToIndex(nextIndex);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoScrolling, images.length]);

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * currentSize.width,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / currentSize.width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handlePress = (destination?: string) => {
    if (destination) {
      alert(`Naviguer vers la page ${destination}`);
    }
  };

  return (
    <View style={[styles.container, { 
      padding: currentSize.padding,
      borderRadius: currentSize.borderRadius,
    }]}
    >
      <Text style={styles.subtitle}>{titre}</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={[styles.scrollView, { width: currentSize.width }]}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.slideContainer, { 
              width: currentSize.width,
              height: currentSize.height,
              borderRadius: currentSize.borderRadius - 5,
            }]}
            onPress={() => handlePress(destination)}
          >
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToIndex(index)}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: Colors.neutral,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  scrollView: {
    flexGrow: 0,
  },
  slideContainer: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.tertiary,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: Colors.accent,
    transform: [{ scale: 1.2 }],
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default CustomSlider;
