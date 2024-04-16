import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View, PanResponder, Text } from 'react-native';
import { MapsApiKey } from '@env';
import * as Location from "expo-location"
import { useIsFocused } from '@react-navigation/native';
import { AppColors, GeneralStyle } from '../../Styles/GeneralStyles';
const MapPreview = ({ latitude, longitude }) => {
  const { width, height } = Dimensions.get('window');
  const [location,setLocation]=useState({latitude:"",longitude:""})

  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=16&size=800x400&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&key=${MapsApiKey}`;

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
        const response  = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${MapsApiKey}`)
        const data = await response.json();
        setAddress(data.results[0].formatted_address)
      }
    };
    fetchLocation();
  }, [isFocused,location]);

  return (
    <View style={[styles.container,{backgroundColor:AppColors.footerBackground}]}>
    <Image
      source={location.latitude !== "" ? { uri: url } : require('../../images/mapa.png')}
      style={styles.userImage}
    />
    <Text style={[styles.addressText,{color:AppColors.white}]}>{address}</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo el espacio disponible
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    padding: 20, // Agrega un poco de espacio alrededor del contenido
  },
  userImage: {
    width: '100%', // Ancho del 100% del contenedor
    height: 300, // Altura fija (puedes ajustarla según tus necesidades)
    marginBottom: 20, // Agrega espacio entre la imagen y el texto
    borderRadius:12,
  },
  addressText: {
    fontSize: 16, // Tamaño de fuente personalizable
    textAlign: 'center', // Alineación de texto centrada
  },
});

export default MapPreview;


