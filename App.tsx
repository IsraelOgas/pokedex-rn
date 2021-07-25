import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Tabs } from './src/navigator/Tabs'

const App = () => {
  return (
    <NavigationContainer>
      {/* <Navigator /> */ }
      <Tabs />
    </NavigationContainer>
  )
}

export default App;