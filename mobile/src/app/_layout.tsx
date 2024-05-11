import "./../styles/global.css"

import { Slot } from "expo-router"
import { Loading } from "../components/loading"

import {
  useFonts,
  Roboto_700Bold,
  Roboto_500Medium,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto"
import { StatusBar, } from "react-native"
import { Background } from "../components/background"
import Toast from 'react-native-toast-message';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
  })

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Toast
        position='top'
      />
      
      {fontsLoaded ? <Slot /> : <Loading />}
    </Background>
  );
}

