import React, { ReactElement, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Text } from "react-native-paper";
import Order from "../../interfaces/Order";
import nominatim from "../../models/nominatim";
import { Base, Typography } from "../../styles";

interface Props {
  route: { params: { order: Partial<Order> } };
}

const ShipOrder = ({ route }: Props) => {
  //   console.log(route);
  const { order } = route.params || false;
  const [marker, setMarker] = useState<ReactElement>();

  let results;

  useEffect(() => {
    (async () => {
      results = await nominatim.getCoordinates({
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
