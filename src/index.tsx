import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'

import { HomeNavigator } from "@components";

export default function App() {
    return (
        <NavigationContainer>
            <HomeNavigator />
        </NavigationContainer>
    )
}