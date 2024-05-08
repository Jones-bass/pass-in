
import { View, Image, StatusBar, ToastAndroid } from "react-native"

import Logo from '../assets/logo.png';
import { Input } from "../components/input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { Button } from "../components/button";
import { useState } from "react";
import { Link } from "expo-router";

export default function Home() {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleAccessCredential() {
    if (!code.trim()) {
      return ToastAndroid.show('Ingresso, Ingresso não encontrado!', ToastAndroid.SHORT);
    }
  }

  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />

      <Image
        source={Logo}
        className="h-16"
        resizeMode="contain"
      />

      <View className="w-full mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="Código do ingresso"
            onChangeText={setCode}
          />
        </Input>

        <Button
          onPress={handleAccessCredential}
          isLoading={isLoading}
          title="Acessar credencial"
        />

        <Link
          href="/register"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Ainda não possui ingresso?
        </Link>

      </View>
    </View>
  )
}