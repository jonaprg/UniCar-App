import { createAsyncThunk } from '@reduxjs/toolkit'
import { getTripsFromDatabase, addTripToDatabase } from '../api/tripAPI'

// Acción asíncrona para obtener los viajes de la base de datos
export const fetchTrips = createAsyncThunk('trips/fetchTrips', async () => {
  const trips = await getTripsFromDatabase()
  return trips
})

// Acción asíncrona para agregar un nuevo viaje a la base de datos
export const addTrip = createAsyncThunk('trips/addTrip', async (tripData) => {
  const newTrip = await addTripToDatabase(tripData)
  return newTrip
})
