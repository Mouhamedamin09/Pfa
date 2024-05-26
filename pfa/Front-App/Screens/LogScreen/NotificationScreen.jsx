// ResetPasswordNotification.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';

const NotificationScreen = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/Group 3421 (1).png')} style={[styles.image]} />
      <Text style={styles.text}>Check your email</Text>
      <Text style={styles.text1}>We have send password recovery instruction to your email</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft:10,
    marginRight:10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight:"bold"
  },
  text1:{
    textAlign: 'center',
    color:"#7D848D"
  },
  closeButton: {
    backgroundColor: '#6C21DC',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  image:{
    width:50,
    height:50,
    top:-20,
  }
});

export default NotificationScreen ;
