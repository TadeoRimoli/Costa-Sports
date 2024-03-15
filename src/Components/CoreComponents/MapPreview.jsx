import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View, PanResponder, Text } from 'react-native';
import { mapsApiKey } from '../../Constants/Constants';
import * as Location from "expo-location"
import { useIsFocused } from '@react-navigation/native';
const MapPreview = ({ latitude, longitude }) => {
  const { width, height } = Dimensions.get('window');
  const [location,setLocation]=useState({latitude:"",longitude:""})

  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=16&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&key=${mapsApiKey}`;

  const [errorMessage,setErrorMessage]=useState("")
  const [address,setAddress]=useState("")

  const isFocused = useIsFocused()

  useEffect(() => {
    const fetchLocation = async () => {
      if (isFocused) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMessage("Permission denied");
          return;
        }
        try {
          let location = await Location.getCurrentPositionAsync();
          setLocation({latitude:location.coords.latitude,longitude:location.coords.longitude})
        } catch (error) {
          console.error("Error al obtener la ubicación:", error);
        }
      }
    };
    fetchLocation();
  }, [isFocused]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (isFocused && location.latitude) {
        const response  = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${mapsApiKey}`)
        const data = await response.json();
        setAddress(data.results[0].formatted_address)
      }
    };
    fetchLocation();
  }, [isFocused,location]);

  return (
    <>
        <Image
          source={ location.latitude!="" ?  { uri: url } : require('../../images/mapa.png')}
          style={styles.userImage}
        />
        <Text>{address}</Text>
      </>
  );
};

const styles = StyleSheet.create({
  userImage: {
    width: 300,
    height: 200,
    borderRadius: 50,
    marginBottom: 20,
  },
});
export default MapPreview;


