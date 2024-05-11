
import { View, Image, StatusBar } from "react-native"

import Logo from '../assets/logo.png';
import { Input } from "../components/input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { Button } from "../components/button";
import { useState } from "react";
import { Link, Redirect } from "expo-router";
import { api } from "../server/api";
import Toast from "react-native-toast-message";
import { useBadgeStore } from "../store/badge-store";

export default function Home() {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore()
  console.log("DADOS =>", badgeStore.data)

  async function handleAccessCredential() {
    try {
      if (!code.trim()) {
        return Toast.show({
          type: 'info',
          text1: 'Ingresso!',
          text2: 'Informe o código do ingresso!',
          text1Style: {
            color: '#3BABF9',
            fontWeight: 'bold',
            fontSize: 14,
          },
        });
      }
      setIsLoading(true)

      const { data } = await api.get(`/attendees/${code}/badge`)
      badgeStore.save(data.badge)

      console.log(data)
    } catch (error) {
      setIsLoading(false)

      return Toast.show({
        type: 'error',
        text1: 'Ingresso!',
        text2: 'Ingresso, Ingresso não encontrado!',
        text1Style: {
          color: '#F93D1F',
          fontWeight: 'bold',
          fontSize: 14,
        },
      });
    }
  }
  if (badgeStore.data?.checkInURL) {
    return <Redirect href="/ticket" />
  }


  return (
    <View className="flex-1 items-center justify-center p-8">
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