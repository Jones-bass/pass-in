import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { Button } from "../components/button"
import { FontAwesome } from "@expo/vector-icons"
import { colors } from "../styles/colors"
import { Credential } from "../components/credential"
import { Header } from "../components/header"

export default function Ticket() {

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title="Minha Credencial" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential />

        <FontAwesome
          name="angle-double-down"
          color={colors.gray[300]}
          size={24}
          className="self-center my-6"
        />

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do evento{" "}
        </Text>

        <Button title="Compartilhar" />

        <TouchableOpacity
          className="mt-10"
          activeOpacity={0.7}
        >
          <Text className="text-base text-white font-bold text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
