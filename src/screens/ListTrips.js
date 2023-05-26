import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getTrips } from '../reducers/trips.js'
const ListTrips = () => {
  const trips = useSelector((state) => state.trips)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTrips())
  }, [])
  console.log('trips', trips)

  return (
    <View>
      <Text>List trips</Text>
    </View>
  )
}

export default ListTrips
