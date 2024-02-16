import { View, Text } from 'react-native'
import React from 'react'

const CustomText = ({styles,children}) => {
  return (
      <Text  style={[{color:'black'},styles]}>{children}</Text>
  )
}

export default CustomText