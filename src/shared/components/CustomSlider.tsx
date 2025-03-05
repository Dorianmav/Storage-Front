import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Image, Text, Platform } from 'react-native';
import Colors from '../../theme/colors';
import { MangaPreview } from '../../features/manga/types/Manga';

type SizeType = 'mini' | 'small' | 'medium' | 'large';

type CustomSliderProps = {
  mangaPreviews: MangaPreview[];
  size?: SizeType;
  titre?: string;
  onPress?: () => void;
};

const { width } = Dimensions.get('window');

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

const CustomSlider: React.FC<CustomSliderProps> = ({ mangaPreviews, size = 'medium', titre, onPress }) => {
  const scrollViewRef = React.createRef<ScrollView>();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [isAutoScrolling, setIsAutoScrolling] = React.useState<boolean>(true);
  
  const currentSize = SIZES[size] || SIZES.medium;

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoScrolling && mangaPreviews.length > 1) {
      interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % mangaPreviews.length;
        scrollToIndex(nextIndex);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoScrolling, mangaPreviews.length]);

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * currentSize.width,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / currentSize.width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={[styles.container, { 
      padding: currentSize.padding,
      borderRadius: currentSize.borderRadius,
    }]}
    >
      {titre && <Text style={styles.subtitle}>{titre}</Text>}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={[styles.scrollView, { width: currentSize.width }]}
      >
        {mangaPreviews.map((manga, index) => (
          <TouchableOpacity
            key={manga.id}
            style={[styles.slideContainer, { 
              width: currentSize.width,
              height: currentSize.height,
              borderRadius: currentSize.borderRadius - 5,
            }]}
            onPress={handlePress}
          >
            <Image source={{ uri: manga.image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {mangaPreviews.map((_, index) => (
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
