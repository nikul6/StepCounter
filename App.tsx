import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import AppleHealthKit, { HealthInputOptions, HealthKitPermissions } from 'react-native-health';
import { useEffect, useState } from 'react';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  }
}

const STEPS_GOAL = 10_000

export default function App() {
  const [hasPermissons, setHasPermissions] = useState(false);
  const [stpes, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.log("error permissions")
        return;
      }
      setHasPermissions(true);
    })
  }, [])

  useEffect(() => {
    if (!hasPermissons) {
      return;
    }

    const option: HealthInputOptions = {
      date: new Date().toISOString(),
      includeManuallyAdded: false
    }

    AppleHealthKit.getStepCount(option, (err, results) => {
      if (err) {
        console.log("error steps")
        return;
      }
      // console.log("results ---> ", results.value)
      setSteps(results.value);
    })

    AppleHealthKit.getFlightsClimbed(option, (err, results) => {
      if (err) {
        console.log("error flights climbed")
        return;
      }
      setFlights(results.value)
    })

    AppleHealthKit.getDistanceWalkingRunning(option, (err, results) => {
      if (err) {
        console.log("error distance")
        return;
      }
      setDistance(results.value)
    })
  }, [hasPermissons])

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
