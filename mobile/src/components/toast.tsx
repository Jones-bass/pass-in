import React, { useEffect } from 'react';
import { Text, View, ToastAndroid } from 'react-native';

interface PropsToast {
  message: string;
  backgroundColor: string;
  textColor: string;
}

export const CustomToast = ({ message, backgroundColor, textColor }: PropsToast) => {
  useEffect(() => {
    if (message) {
      const toastContent = (
        <View style={{ backgroundColor, padding: 10 }}>
          <Text style={{ color: textColor }}>{message}</Text>
        </View>
      );

      ToastAndroid.showWithGravity(
        toastContent.toString(), // Convertendo o elemento JSX para string
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  }, [message, backgroundColor, textColor]);

  return null;
};
