import * as React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function MyText ({ children, type = 'body' }) {
  return (
    <Text style={[styles[type]]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  body: {
    fontSize: 18
  },
  caption: {
    fontSize: 14
  }
})
