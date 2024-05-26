import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function Location1() {
  const [location, setLocation] = useState(null);

  Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);

      // Send location data to your Node.js server
      fetch('http://192.168.1.17:3000/receive-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentLocation),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Response from server:', data);
        // Handle response from server if needed
      })
      .catch(error => {
        console.error('Error sending location data to server:', error);
      });
    };
    getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <Text>Current Location: {JSON.stringify(location)}</Text>
      ) : (
        <Text>Fetching location...</Text>
      )}
      <StatusBar style="auto" />
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
