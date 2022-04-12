import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import warehouse from "./assets/warehouse.jpg";
import Stock from "./components/Stock";
import snes from "./assets/snes.png";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.base}>
        <Text style={{ color: "#33c", fontSize: 42 }}>Lager-appen</Text>
        <Image source={snes} style={{ width: "100%", height: "12%" }} />
        <Stock />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: "#fff",
    paddingStart: 12,
    paddingEnd: 12,
  },
});
