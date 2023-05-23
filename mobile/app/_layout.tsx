import BlurBG from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import { ImageBackground } from 'react-native'
import { styled } from 'nativewind'
import * as SecureStore from 'expo-secure-store'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'

export default function Layout() {
  const [isLogged, setIsLogged] = useState(null)

  const [hasLoadFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  const StyledStripes = styled(Stripes)

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsLogged(!!token)
    })
  }, [])

  if (!hasLoadFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={BlurBG}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'ransparent' },
        }}
      >
        <Stack.Screen name="index" redirect={isLogged} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}
