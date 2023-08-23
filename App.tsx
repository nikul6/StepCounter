import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import AppleHealthKit, { HealthInputOptions, HealthKitPermissions } from 'react-native-health';
import { useEffect, useState } from 'react';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps],
    write: [],
  }
}

const STEPS_GOAL = 10_000

export default function App() {
  const [hasPermissons, setHasPermissions] = useState(false);
  const [stpes, setSteps] = useState(0);

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
      }
      // console.log("results ---> ", results.value)
      setSteps(results.value);
    })
  }, [hasPermissons])

  return (
    <View style={styles.container}>
      <RingProgress redius={150} strokeWidth={50} progress={stpes / STEPS_GOAL} />
      <View style={styles.values}>
        <Value label="Steps" value={stpes.toString()} />
        <Value label="Distance" value="0,75 km" />
        <Value label="Flights Climbed" value="12" />
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
