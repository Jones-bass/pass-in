
import { View, Image, StatusBar } from "react-native"
import { Link } from "expo-router"


import Logo from '../assets/logo.png';

export function Home() {
  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />

      <Image
        source={Logo}
        resizeMode="contain"
      />

      <View className="w-full mt-12 gap-3">
        

        <Link
          href="/"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  )
}