import React, { ReactElement, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Text } from "react-native-paper";
import Order from "../../interfaces/Order";
import nominatim from "../../models/nominatim";
import { Base, Typography } from "../../styles";
import * as Location from "expo-location";

interface Props {
  route: { params: { order: Partial<Order> } };
}

const ShipOrder = ({ route }: Props) => {
  //   console.log(route);
  const { order } = route.params || false;
  const [marker, setMarker] = useState<ReactElement>();
  const [userLocationMarker, setUserLocationMarker] = useState<ReactElement>();
  const [locationMarker, setLocationMarker] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});

      setUserLocationMarker(
        <Marker
          coordinate={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          }}
          title="Min plats"
          pinColor="blue"
        />
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const results = await nominatim.getCoordinates({
        street: order.address,
        city: order.city,
      });

      setMarker(
        <Marker
          coordinate={{
            latitude: parseFloat(results[0].lat),
            longitude: parseFloat(results[0].lon),
          }}
          title={results[0].display_name}
        />
      );
    })();
  }, []);

  return (
    <View style={Base.base}>
      <Text style={Typography.header2}>Skicka order</Text>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 56.1612,
            longitude: 15.5869,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {marker}
          {userLocationMarker}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ShipOrder;
