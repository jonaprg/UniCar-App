import React, {useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from "react-redux";

import AuthStack from "./AuthStack.js";
import HomeScreen from "../screens/HomeScreen.js";
import { restoreToken } from "../features/auth/auth.js";

const RootNavigator = () => {
  const {userToken, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if(value !== null) {
        console.log('Token recuperado', value)
        dispatch(restoreToken(value))
      }
      else { 
        console.log('No data')
        dispatch(restoreToken(null))
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return  (
    <NavigationContainer>
      {userToken ? <HomeScreen /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default RootNavigator
