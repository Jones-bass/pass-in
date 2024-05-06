import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';

export function Loading() {
  return (
    <View className="flex justify-center items-center">
      <ActivityIndicator />
    </View>
  );
}