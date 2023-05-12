import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import GooglePlacesInput from '../components/GooglePlacesInput.js'
import DatePickerModal from '../components/DatePicker.js'

const Home = () => {
  const [count, setCount] = React.useState(1)
  const { colorScheme } = useColorScheme()
  return (
    <View className='bg-primary flex-1'>
      <Image
        source={require('../../assets/headerHome.jpg')}
        className='w-full h-52'

      />
      <View className='p-5'>
        <Text className='text-2xl font-bold text-secondary'>
          Hola, donde quieres ir.
        </Text>
        <View className='w-full bg-secondary rounded-3xl p-5 my-5'>
          <View className='mt-5'>
            <Text className='text-lg font-medium text-black/60'>
              Origen
            </Text>

            <GooglePlacesInput placeholder='De' />
            <Text className='text-lg font-medium text-black/60'>
              Destino
            </Text>
            <GooglePlacesInput placeholder='A' />
            <DatePickerModal />
            <View className='flex-row justify-between items-center my-5'>
              <View className='flex-row justify-center items-center gap-3'>
                <AntDesign
                  name='minuscircleo'
                  size={24}
                  color={colorScheme === 'light' ? 'black' : 'white'}
                  onPress={() => setCount(count - 1)}
                />
                <Text className='text-xl dark:text-white'>{count}</Text>
                <AntDesign
                  name='pluscircleo'
                  size={24}
                  color={colorScheme === 'light' ? 'black' : 'white'}
                  onPress={() => setCount(count + 1)}
                />
              </View>
              <TouchableOpacity className='flex-row justify-center rounded-full bg-buttonColor p-3 w-2/4 self-center'>
                <Text className='text-white dark:text-black font-bold'>
                  Buscar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>

  )
}

export default Home
