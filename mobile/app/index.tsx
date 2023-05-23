import { Text, View, TouchableOpacity } from 'react-native'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useEffect } from 'react'
import { api } from '../src/lib/api'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'
import Logo from '../src/assets/nlw-spacetime-logo.svg'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/1fb7b9a8abd55d738285',
}

export default function App() {
  const router = useRouter()

  const [, response, singInGithub] = useAuthRequest(
    {
      clientId: '1fb7b9a8abd55d738285',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetimeKevin',
      }),
    },
    discovery,
  )

  async function handleGithubSignIn(code: String) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data
    await SecureStore.setItemAsync('token', token)
    router.push('/memories')
  }

  useEffect(() => {
    // debbug do redirectURl, importante semprerevisar
    // console.log(
    //   makeRedirectUri({
    //     scheme: 'nlwspacetimeKevin',
    //   }),
    // )
    if (response?.type === 'success') {
      const { code } = response.params
      handleGithubSignIn(code)
    }
  }, [response])

  return (
    <View className="flex-1 px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <Logo />
        <View className="space-y-2">
          <Text className="text-title text-center text-2xl font-bold leading-tight text-gray-50 ">
            {' '}
            Sua capsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-50">
            {' '}
            Colecione momentos marcantes de sua jornada e compartilhe (se
            quiser) com omundo
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          className="rounded-full bg-green-500 px-5 py-3"
          onPress={() => singInGithub()}
        >
          <Text className="font-body text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-50">
        Feito com amor - Kevin Alexandre
      </Text>
    </View>
  )
}
