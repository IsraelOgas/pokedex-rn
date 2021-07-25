import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabHome } from './TabHome';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabSearchScreen } from './TabSearch';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <Tab.Navigator
            sceneContainerStyle={ {
                backgroundColor: 'white'
            } }
            tabBarOptions={ {
                activeTintColor: '#5856D6',
                labelStyle: {
                    marginBottom: (Platform.OS === 'ios') ? 0 : 10
                },
                style: {
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    borderWidth: 0,
                    elevation: 0,
                    height: (Platform.OS === 'ios') ? 80 : 60
                },
                keyboardHidesTabBar: true
            } }
        >
            <Tab.Screen
                name="HomeScreen"
                component={ TabHome }
                options={ {
                    tabBarLabel: "List",
                    tabBarIcon: ({ color }) => (
                        <Icon color={ color } size={ 25 } name="list-outline" />
                    )
                } }
            />
            <Tab.Screen
                name="SearchScreen"
                component={ TabSearchScreen }
                options={ {
                    tabBarLabel: "Search",
                    tabBarIcon: ({ color }) => (
                        <Icon color={ color } size={ 25 } name="search-outline" />
                    )
                } }
            />
        </Tab.Navigator>
    );
}