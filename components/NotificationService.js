import { Alert } from 'react-native';

class NotificationService {
  static showPriceAlert(product, oldPrice, newPrice, change) {
    const isIncrease = change > 0;
    const emoji = isIncrease ? '📈' : '📉';
    const color = isIncrease ? 'red' : 'green';
    
    Alert.alert(
      `${emoji} Price Alert`,
      `${product} price has ${isIncrease ? 'increased' : 'decreased'} from ${oldPrice} to ${newPrice} (${change > 0 ? '+' : ''}${change}%)`,
      [
        { text: 'View Details', onPress: () => console.log('Navigate to market prices') },
        { text: 'Dismiss', style: 'cancel' }
      ]
    );
  }

  static showConnectionRequest(farmerName) {
    Alert.alert(
      '🤝 Connection Request',
      `${farmerName} wants to connect with you`,
      [
        { text: 'Accept', onPress: () => console.log('Accept connection') },
        { text: 'Decline', style: 'cancel' }
      ]
    );
  }

  static showKnowledgeUpdate(topic, author) {
    Alert.alert(
      '📚 New Knowledge',
      `${author} shared new insights about ${topic}`,
      [
        { text: 'Read Now', onPress: () => console.log('Navigate to knowledge') },
        { text: 'Later', style: 'cancel' }
      ]
    );
  }

  static showHealthAlert(birdCount, issue) {
    Alert.alert(
      '⚠️ Health Alert',
      `${birdCount} birds showing signs of ${issue}. Consider consulting a veterinarian.`,
      [
        { text: 'Get Help', onPress: () => console.log('Navigate to help') },
        { text: 'Dismiss', style: 'cancel' }
      ]
    );
  }

  static showMarketTrend(trend, period) {
    Alert.alert(
      '📊 Market Trend',
      `Market ${trend} by ${period}. Check the latest prices and trends.`,
      [
        { text: 'View Market', onPress: () => console.log('Navigate to market') },
        { text: 'Dismiss', style: 'cancel' }
      ]
    );
  }
}

export default NotificationService;
