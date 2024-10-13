import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { View, Text } from "react-native";

export default function LocationScreen() {
    const [location, setLocation] = useState<Location.LocationObject>();
    const [errorMsg, setErrorMsg] = useState('');
    const [mapRegion, setMapRegion] = useState();

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync();
            setLocation(location);
            setMapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            });
            console.log(location)
        })();
    }, []);

    if (errorMsg) {
        return (
            <View>
                <Text>{errorMsg}</Text>
            </View>
        )
    }

    return (
        <View style={{backgroundColor: '#6F4E37', height:'100%'}}>
            {location ? (
                <MapView
                style={{flex:1}}
                region={mapRegion}
                showsUserLocation={true}>
                    <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }}>
                    </Marker>
                </MapView>
            ) : (
                <Text>Fetching location...</Text>
            )}
        </View>
    )
}