import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  Share,
} from "react-native"
import { Button } from "../components/button"
import { FontAwesome } from "@expo/vector-icons"
import { colors } from "../styles/colors"
import { Credential } from "../components/credential"
import { Header } from "../components/header"
import { useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { QRCode } from "../components/qrcode"
import { useBadgeStore } from "../store/badge-store"
import { Redirect } from "expo-router"
import Toast from "react-native-toast-message"

export default function Ticket() {

  const [expandQRCode, setExpandQRCode] = useState(false)
  const [image, setImage] = useState('')

  const badgeStore = useBadgeStore()

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInURL) {
        await Share.share({
          message: badgeStore.data.checkInURL,
        })
      }
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Algo deu Errado!',
        text2: 'Não foi possível compartilhar!',
        text1Style: {
          color: '#F93D1F',
          fontWeight: 'bold',
          fontSize: 14,
        },
      });
    }
  }

  if (!badgeStore.data?.checkInURL) {
    return <Redirect href="/" />
  }



  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      })

      if (result.assets) {
        setImage(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
      ToastAndroid.show('Foto, Não foi possível selecionar a imagem.', ToastAndroid.SHORT);
    }
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title="Minha Credencial" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential 
          data={badgeStore.data}
          image={image} 
          onChangeAvatar={handleSelectImage} 
          onExpandQRCode={() => setExpandQRCode(true)}
        />

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

        <Button title="Compartilhar" onPress={handleShare} />

        <TouchableOpacity
          className="mt-10"
          activeOpacity={0.7}
          onPress={() => badgeStore.remove()}
        >
          <Text className="text-base text-white font-bold text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={expandQRCode} statusBarTranslucent>
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpandQRCode(false)}
          >
            <QRCode value="QRCode Teste" size={300} />
            <Text className="font-body text-orange-500 text-sm mt-10 text-center">
              Fechar QRCode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  )
}
