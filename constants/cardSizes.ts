import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export type CardSize = 'small' | 'medium' | 'large';

export const getCardWidth = (size: CardSize, itemsPerRow: number = 2) => {
    const totalPadding = 40; // padding total (15 * 2 + 10 entre les cartes)
    const baseWidth = (width - totalPadding) / itemsPerRow;
    
    switch (size) {
        case 'small':
            return baseWidth * 0.8;
        case 'large':
            return baseWidth * 1.2;
        case 'medium':
        default:
            return baseWidth;
    }
};

export const cardSizeStyles = {
    small: {
        fontSize: 10,
        padding: 8,
    },
    medium: {
        fontSize: 12,
        padding: 10,
    },
    large: {
        fontSize: 14,
        padding: 12,
    },
};
