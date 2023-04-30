// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAiaGIk2v7tFS9krslgF-MmtZv-bI0XXdo',
  authDomain: 'unicar-jrg.firebaseapp.com',
  projectId: 'unicar-jrg',
  storageBucket: 'unicar-jrg.appspot.com',
  messagingSenderId: '638862561201',
  appId: '1:638862561201:web:3b8da579420f7edd3c7790',
  measurementId: 'G-FQJXTEY298'
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const auth = getAuth()
