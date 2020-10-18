import React, { useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../../images/mapMarker.png';
import api from '../../services/api';

import styles from './style';

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number,
}

export default function OrphanageMap() {

    const navigation = useNavigation();

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useFocusEffect(() => {
        api.get('orphanages').then(res => {
            setOrphanages(res.data);
        });
    });

    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate('Orphanage', { id });
    }

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -29.4543083,
                    longitude: -51.9714186,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                }}
            >
                {orphanages.map(orphanage => (
                    <Marker
                        key={orphanage.id}
                        icon={mapMarker}
                        calloutAnchor={{
                            x: 2.8,
                            y: 0.85,
                        }}
                        coordinate={{
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude,
                        }}
                    >
                        <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{orphanage.name}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))
                }
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}> {orphanages.length} orfanatos encontrados</Text>
                <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage} >
                    <Feather name="plus" size={20} color="#FFF" />
                </RectButton>
            </View>
        </View>
    );
}
