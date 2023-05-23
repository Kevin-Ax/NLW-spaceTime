import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  TextInput,
  ScrollView,
} from 'react-native'
import Logo from '../src/assets/nlw-spacetime-logo.svg'
import { Link } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'

export default function New() {
  const { bottom, top } = useSafeAreaInsets()
  const [publicClick, setPublicClick] = useState(false)
  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <Logo />
        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-600">
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-4 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={publicClick}
            onValueChange={() => setPublicClick(!publicClick)}
            thumbColor={publicClick ? '#9b79ea' : '#9e9ea0'}
            trackColor={{ false: '#000', true: '#fff' }}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="h-32 items-center justify-center rounded border border-dashed border-gray-500 bg-black/20"
        >
          <View className="flex-row items-center gap-2">
            <Icon name="image" color="#fff"></Icon>
            <Text className="font-body text-sm text-gray-200">
              Adicionar foto ou video de capa
            </Text>
          </View>
        </TouchableOpacity>
        <TextInput
          className="p-0 font-body text-lg text-gray-50"
          placeholder="Diga o que deseja se lembrar"
          placeholderTextColor="#56565a"
        ></TextInput>
        <TouchableOpacity
          activeOpacity={0.6}
          className="mt-11 items-center rounded-full bg-green-500 px-5 py-3"
        >
          <Text className="font-body text-sm uppercase text-black">
            Salvar lembrança
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
