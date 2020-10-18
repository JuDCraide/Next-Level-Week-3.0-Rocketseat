import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanageMap from './pages/OrphanageMap';
import Orphanage from './pages/Orphanage';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#F2F3F5' } }}>
                <Screen
                    name="OrphanageMap"
                    component={OrphanageMap}
                />
                <Screen
                    name="Orphanage"
                    component={Orphanage}
                    options={{
                        headerShown:true,
                        header: () => <Header title="Orfanato"/>
                    }}
                />
                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown:true,
                        header: () => <Header showCancel title="Selecione no mapa"/>
                    }}
                />
                <Screen
                    name="OrphanageData"
                    component={OrphanageData}
                    options={{
                        headerShown:true,
                        header: () => <Header showCancel title="Informa os dados"/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}