import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParams } from './TabHome';
import { SearchScreen } from '../screens/SearchScreen';
import { PokemonScreen } from '../screens/PokemonScreen';

const TabSearch = createStackNavigator<RootStackParams>();

export const TabSearchScreen = () => {
    return (
        <TabSearch.Navigator
            screenOptions={ {
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            } }
        >
            <TabSearch.Screen name="HomeScreen" component={ SearchScreen } />
            <TabSearch.Screen name="PokemonScreen" component={ PokemonScreen } />
        </TabSearch.Navigator>
    );
}