import "./../styles/global.css"

import { Loading } from "../components/loading"

import {
  useFonts,
  Roboto_700Bold,
  Roboto_500Medium,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto"
import { StatusBar } from "expo-status-bar"
import { Home } from "."

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
  })


  return (
    <>
      <StatusBar style="light" />
      {fontsLoaded ? <Home /> : <Loading />}
    </>
  )
}
