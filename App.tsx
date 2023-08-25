import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import useHealthData from './src/hooks/useHealthData';

const STEPS_GOAL = 10_000

export default function App() {
  const { stpes, flights, distance } = useHealthData(new Date(2023, 8, 25));

  return (
    <View style={styles.container}>
      <RingProgress redius={150} strokeWidth={50} progress={stpes / STEPS_GOAL} />
      <View style={styles.values}>
        <Value label="Steps" value={stpes.toString()} />
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />
        <Value label="Flights Climbed" value={flights.toString()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 12
  },
  values: {
    flexDirection: 'row',
    gap: 25,
    flexWrap: 'wrap',
    marginTop: 100
  },
});
