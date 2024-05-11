import { View, Image, StatusBar } from "react-native"
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import { Link, router } from "expo-router"
import { Input } from "../components/input"
import { colors } from "../styles/colors"
import { Button } from "../components/button"
import logo from '../assets/logo.png'
import { useState } from "react"
import { api } from "../server/api"
import axios from "axios"
import Toast from 'react-native-toast-message'

const eventId = '9e9bd979-9d10-4915-b339-3786b1634f33'

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return  Toast.show({
          type: 'info',
          text1: 'Inscrição!',
          text2: 'Inscrição, Preencha todos os campos!',
          text1Style: {
            color: '#3BABF9',
            fontWeight: 'bold',
            fontSize: 14,
          },
        })
      }

      setIsLoading(true)

      const registerResponse = await api.post(`/event/${eventId}/attendees`, {
        name,
        email,
      })

      if (registerResponse.data.attendeeId) {
       return Toast.show({
          type: 'success',
          text1: 'Sucesso',
        })
      }
      
      router.push("/ticket")

    } catch (error) {
      console.log(error)
      setIsLoading(false)

      if (axios.isAxiosError(error)) {
        if (
          String(error.response?.data.message).includes("already registered")
        ) {
          return Toast.show({
            type: 'error',
            text1: 'Inscrição!',
            text2: 'Inscrição, Este e-mail já está cadastrado!',
            text1Style: {
              color: '#F93D1F',
              fontWeight: 'bold',
              fontSize: 14,
            },
          });
        }
      }

      Toast.show({
        type: 'error',
        text1: 'Algo deu errado!',
        text2: 'Não foi possível fazer a inscrição',
        text1Style: {
          color: '#F93D1F',
          fontWeight: 'bold',
          fontSize: 14,
        },
      });
    } 
  }


  return (
    <View className="flex-1 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />

      <Image
        source={logo}
        className="h-16"
        resizeMode="contain"
      />

      <View className="w-full mt-12 gap-3">
        <Input>
          <FontAwesome6
            name="user-circle"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="Nome completo" onChangeText={setName} />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </Input>

        <Button
          title="Realizar inscrição"
          onPress={handleRegister}
          isLoading={isLoading}
        />

        <Link
          href="/register"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  )
}
