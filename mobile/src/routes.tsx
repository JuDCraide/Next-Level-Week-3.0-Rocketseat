import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanageMap from './pages/OrphanageMap';
import Orphanage from './pages/Orphanage';

const { Navigator, Screen } = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="OrphanageMap" component={OrphanageMap} />
                <Screen name="Orphanage" component={Orphanage} />
            </Navigator>
        </NavigationContainer>
    )
}