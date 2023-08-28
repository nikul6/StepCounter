import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import useHealthData from './src/hooks/useHealthData';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

const STEPS_GOAL = 10_000

export default function App() {
  const [date, setDate] = useState(new Date())
  const { stpes, flights, distance } = useHealthData(new Date(2023, 8, 25));

  const changeDate = (numDays: number) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + numDays);
    setDate(currentDate);
  }

  return (
    <View style={styles.container}>
      <View style={styles.datePicker}>
        <AntDesign name='left' size={24} color="#C3FF53" onPress={() => changeDate(-1)} />
        <Text style={styles.date}>{date.toDateString()}</Text>
        <AntDesign name='right' size={24} color="#C3FF53" onPress={() => changeDate(1)} />
      </View>
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
  datePicker: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  date: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
    marginHorizontal: 20
  }
});
