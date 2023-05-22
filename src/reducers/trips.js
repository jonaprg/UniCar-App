import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDriver: '',
  origin: '',
  destination: '',
  dateTime: '',
  price: 2,
  seatPlaces: 1,
  seatsAvailable: 1,
  carBrand: '',
  carColor: '',
  passangers: []
}

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setTrip: (state, action) => {
      return {
        ...state,
        userDriver: action.payload.id,
        origin: action.payload.name,
        destination: action.payload.email,
        dateTime: action.payload.phone,
        price: action.payload.university,
        seatPlaces: action.payload.carBrand,
        seatsAvailable: action.payload.carColor,
        carBrand: action.payload.ratings,
        carColor: action.payload.preferences,
        passangers: action.payload.notificationToken
      }
    },
    resetTrip: (state) => {
      return (state = {
        userDriver: '',
        origin: '',
        destination: '',
        dateTime: '',
        price: 2,
        seatPlaces: 1,
        seatsAvailable: 1,
        carBrand: '',
        carColor: '',
        passangers: []
      })
    }

  }
})

export const {
  setUser,
  resetUser

} = tripSlice.actions
export default tripSlice.reducer

// resetProfilePicture: (state, action) => {
//   return {
//     ...state,
//     profilePicture: action.payload
//   }
// },
// setUserNameRedux: (state, action) => {
//   return {
//     ...state,
//     name: action.payload
//   }
// },
// setUserEmailRedux: (state, action) => {
//   return {
//     ...state,
//     email: action.payload
//   }
// },
// setUserUniversityRedux: (state, action) => {
//   return {
//     ...state,
//     university: action.payload
//   }
// },
// setUserPhoneRedux: (state, action) => {
//   return {
//     ...state,
//     phone: action.payload
//   }
// },
// setUserCarBrandRedux: (state, action) => {
//   return {
//     ...state,
//     carBrand: action.payload
//   }
// },
// setUserCarColorRedux: (state, action) => {
//   return {
//     ...state,
//     carColor: action.payload
//   }
// },
// setUserPreferencesRedux: (state, action) => {
//   return {
//     ...state,
//     preferences: action.payload
//   }
// }
