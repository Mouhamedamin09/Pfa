import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import NotificationScreen from './NotificationScreen'; // Import the notification component

export default function ForgatScreen() {
  let [fontsLoaded] = useFonts({
    'Asar': require('../../assets/fonts/Asar-Regular.ttf'),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInputFocused, setInputFocused] = useState(false);
  const [showBtnContainer, setShowBtnContainer] = useState(true);
  const [showNotification, setShowNotification] = useState(false); // State for showing the notification
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setShowBtnContainer(false);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setShowBtnContainer(true);
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const validateEmail = () => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = () => {
    setShowNotification(true); // Show the notification when the button is pressed
  };

  const closeNotification = () => {
    setShowNotification(false);
    navigation.navigate('OTP') 
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Forgat</Text>
      <Text style={styles.BackText}>Password</Text>
      <TouchableOpacity style={{ zIndex: 10 }} onPress={handlePress}>
      <Image source={require('../../assets/Vector TOP (1).png')} style={[ styles.image4]} />
      </TouchableOpacity>
      <Image source={require('../../assets/Circle 3 SIDE BOTTEM.png')} style={[styles.image, styles.image3]} />
      <Image source={require('../../assets/Untitled design (15).png')} style={[styles.image, styles.image2]} />
      <Image source={require('../../assets/Circle 1 TOP.png')} style={[styles.image, styles.image1]} />
      {/* Email Input */}
      {showBtnContainer && (
      <Text style={styles.text}>Enter your email account to reset  your password</Text>
      )}
      <TextInput
        placeholder="Your Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        onFocus={() => { setInputFocused(true); setShowBtnContainer(false); }}
        onBlur={() => setInputFocused(false)}
      />
      {/* Reset Password Button */}
      <TouchableOpacity style={[styles.input, styles.resetButton]} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
      {/* Modal for Reset Password Notification */}
      <Modal
        visible={showNotification}
        transparent={true}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={closeNotification}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <NotificationScreen onClose={closeNotification} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  input: {
    width: 300,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 17,
    paddingLeft: 20,
    top: 50,
    marginBottom: 20,
    color: '#000',
    fontSize: 16,
    fontFamily: "Asar"
  },
  resetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor:"#6C21DC",
    fontFamily: "Asar",
    borderRadius: 5,
  },
  resetButtonText: {
    fontSize:20 ,
    fontFamily: "Asar",
    color: "#FFFFFF",
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
