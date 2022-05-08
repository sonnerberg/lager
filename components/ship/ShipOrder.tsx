import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Text } from "react-native-paper";
import nominatim from "../../models/nominatim";
import { Base, Typography } from "../../styles";

const ShipOrder = () => {
  //   console.log(route);
  //   const { order } = route.params;
  const [marker, setMarker] = useState<Element>();

  useEffect(() => {
    (async () => {
      const results = await nominatim.getCoordinates({
        street: "Stortorget",
        city: "Karlskrona",
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

  console.log(marker);

  const myMarker = (
    <Marker
      coordinate={{ latitude: 56.17, longitude: 15.59 }}
      title="Min markör"
    />
  );

  console.log(myMarker);

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
          {myMarker}
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
