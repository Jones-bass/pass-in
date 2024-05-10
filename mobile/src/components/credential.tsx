import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native"

import QRCode from '../assets/ticket/qrcode.png'
import band from '../assets/ticket/band.png'
import header from '../assets/ticket/header.png'
import { Feather } from "@expo/vector-icons"
import { colors } from "../styles/colors"

type Props = {
  image?: string
  onChangeAvatar?: () => void
}

export function Credential({ image, onChangeAvatar }: Props) {
  return (
    <>
      <Image
        source={band}
        className="w-24 h-52 z-10"
      />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          source={header}
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">
              eventTitle
            </Text>
            <Text className="text-zinc-50 text-sm font-bold">#02</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {image ? (
          <TouchableOpacity activeOpacity={0.9} onPress={onChangeAvatar}>
            <Image
              source={{ uri: image }}
              className="w-36 h-36 rounded-full -mt-24"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.9}
            className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center"
            onPress={onChangeAvatar}
          >
            <Feather name="camera" color={colors.green[400]} size={32} />
          </TouchableOpacity>
        )}

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          Jones
        </Text>

        <Text className="font-regular text-base text-zinc-300 mb-4">
          data.Jonesbass.tb@gmail.com
        </Text>

        <Image
          source={QRCode}
          className="h-32 w-32"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-6"
        >
          <Text className="font-body text-orange-500 text-sm">
            Ampliar QRCode
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
