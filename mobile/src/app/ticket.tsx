import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { Button } from "../components/button"

export default function Ticket() {

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
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
