import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Example from './Components/Example';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola</Text>
      <StatusBar style="auto" />
      <Example></Example>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
