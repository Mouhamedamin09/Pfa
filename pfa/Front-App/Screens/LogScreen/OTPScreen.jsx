import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function OTPScreen() {
  let [fontsLoaded] = useFonts({
    'Asar': require('../../assets/fonts/Asar-Regular.ttf'),
  });


  const route = useRoute();
  const [email, setEmail] = useState(route.params?.email || '');
  const [otpInputs, setOtpInputs] = useState(Array(4).fill('')); // State to store OTP input values
  const inputRefs = useRef([]); // Ref to store references of OTP input fields
  const navigation = useNavigation();
  const [verifying, setVerifying] = useState(false); // State to control verification process
  const [verificationError, setVerificationError] = useState('');

  useEffect(() => {
    // Focus the first OTP input field when the component mounts
    inputRefs.current[0]?.focus();
  }, []);

  const handleVerify = async () => {
    try {
      setVerifying(true);
      const response = await axios.post('http://192.168.1.17:3000/verify', {
        email: email,
        verificationCode: parseInt(otpInputs.join(''), 10)
      });
      
      if (response.status === 200) {
        console.log('Verification successful:', response.data);
        navigation.navigate('Login');
      } else {
        console.log('Verification failed with status:', response.status);
        setVerificationError('Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationError('Invalid or expired verification code.');
    } finally {
      setVerifying(false);
    }
  };




  const handleInputChange = (index, value) => {
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;

    setOtpInputs(newOtpInputs);

    // Automatically move focus to the next input field when a number is entered
    if (value.length === 1 && index < otpInputs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>OTP</Text>
      <Text style={styles.BackText}>Verification</Text>
      <TouchableOpacity style={{ zIndex: 10 }} onPress={handlePress}>
        <Image source={require('../../assets/Vector TOP (1).png')} style={[ styles.image4]} />
      </TouchableOpacity>
      <Image source={require('../../assets/Circle 3 SIDE BOTTEM.png')} style={[styles.image, styles.image3]} />
      <Image source={require('../../assets/Untitled design (15).png')} style={[styles.image, styles.image2]} />
      <Image source={require('../../assets/Circle 1 TOP.png')} style={[styles.image, styles.image1]} />
      {/* Email Input */}
      <Text style={styles.text}>Please check your email {email} to see the verification code</Text>
      {/* OTP Input Fields */}
      <View style={styles.inputContainer}>
        {otpInputs.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            value={value}
            onChangeText={(text) => handleInputChange(index, text)}
          />
        ))}
      </View>
      {/* Verify Button */}
      <TouchableOpacity style={[styles.input, styles.resetButton]}  onPress={handleVerify}>
        <Text style={styles.resetButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7E5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 39,
    marginBottom: 20,
    color: "white",
    top: 115,
    left: 20,
    zIndex: 999,
    position: "absolute",
    fontFamily: "Asar"
  },
  BackText: {
    fontSize: 39,
    marginBottom: 20,
    color: "white",
    zIndex: 998,
    top: 180,
    left: 20,
    position: "absolute",
    fontFamily: "Asar"
  },
  image: {
    resizeMode: 'cover',
    position: 'absolute',
  },
  image1: {
    top: 40,
    left: 0,
  },
  image2: {
    top: -300,
    left: -150,
    width: 639,
    height: 700,
  },
  image3: {
    top: 40,
    right: 0,
  },
  image4:{
    width:20,
    height:20,
    top:-200,
    left:-150,
   },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 17,
    paddingLeft: 20,
    color: '#000',
    fontSize: 16,
    fontFamily: "Asar",
    marginLeft:15,
    top:50,
    
  },
  resetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#6C21DC",
    fontFamily: "Asar",
    borderRadius: 5,
    width: 300,
    height: 60,
    paddingLeft: 20,
    top: 50,
    marginBottom: 20,
    color: '#000',
    fontSize: 16,
   
  },
  resetButtonText: {
    fontSize:20 ,
    fontFamily: "Asar",
    color: "#FFFFFF",
    paddingRight:10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  text:{
    fontSize:16,
    color:"#7D848D",
    textAlign: 'center',
    marginLeft:20,
    marginTop:20,
    top:30,
    left:-10
  }
});
