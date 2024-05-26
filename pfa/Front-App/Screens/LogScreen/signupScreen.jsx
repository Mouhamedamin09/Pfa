import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import axios from 'axios'; // Import Axios

export default function SignupScreen() {
  let [fontsLoaded] = useFonts({
    'Asar': require('../../assets/fonts/Asar-Regular.ttf'),
  });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  



  const [isInputFocused, setInputFocused] = useState(false);
  const [showBtnContainer, setShowBtnContainer] = useState(true);
  const navigation = useNavigation(); // Access the navigation object

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

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const handlePress = () => {
    navigation.goBack();
  };


  const handleSignUp = () => {
    axios.post('http://192.168.1.17:3000/register', { username, email, password })
      .then(response => {
        // Handle successful response from backend
        console.log('Sign up successful:', response.data);
        // Optionally navigate to another screen after successful sign up
        // navigation.navigate('Home');
        navigation.navigate('OTP', { email: email });
      })
      .catch(error => {
        // Handle error
        console.error('Error signing up:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Create</Text>
      <Text style={styles.BackText}>Account</Text>
      
      <Image source={require('../../assets/Untitled design (15).png')} style={[styles.image, styles.image2]} />
      <Image source={require('../../assets/images/Rectangle 29.png')} style={[styles.image, styles.image10]} />
      {showBtnContainer && (
      <Image source={require('../../assets/images/Rectangle 30.png')} style={[styles.image, styles.image11]} />
    )}
      <Image source={require('../../assets/images/Circle BOTTEM (1).png')} style={styles.circleB} />
      
      <TouchableOpacity onPress={handlePress} style={{ padding: 10 }}>
     <Image source={require('../../assets/Vector TOP (1).png')} style={[styles.image, styles.image3]} />
     </TouchableOpacity>
      {/* Email Input */}
      <TextInput
        placeholder="Name"
        style={styles.input}
        onFocus={() => { setInputFocused(true); setShowBtnContainer(false); }}
        onBlur={() => setInputFocused(false)}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Your Email"
        style={styles.input}
        onFocus={() => { setInputFocused(true); setShowBtnContainer(false); }}
        onBlur={() => setInputFocused(false)}
        onChangeText={text => setEmail(text)}
      />
      {/* Password Input */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        onFocus={() => { setInputFocused(true); setShowBtnContainer(false); }}
        onBlur={() => setInputFocused(false)}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
    
      <Text style={styles.sign}>Sign Up</Text>
      <TouchableOpacity  onPress={handleSignUp}>
      <View style={styles.btnC}>
        <Image source={require('../../assets/Untitled design (16).png')} style={styles.btn2} />
      </View>
      </TouchableOpacity>
      {showBtnContainer && (
        <View style={styles.btnContainer}>
          
          <TouchableOpacity style={styles.rightBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btn3}>Sign In</Text>
            <Image source={require('../../assets/Sign Up BOTTEM.png')} style={[styles.image, styles.image4]} />
          </TouchableOpacity>
        </View>
        
      )}
      {showBtnContainer && (
      <View>
      <Text style={styles.Esignup}>Or Sign up With</Text>
          <Image source={require('../../assets/images/Group 3424.png')} style={styles.icon1} />
          <Image source={require('../../assets/images/Group 3425.png')} style={styles.icon2} />
          <Image source={require('../../assets/images/Group 3426.png')} style={styles.icon3} />
          </View>

)}
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
    top: 85,
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
    top: 150,
    left: 20,
    position: "absolute",
    fontFamily: "Asar"
  },
  image: {
    resizeMode: 'cover',
    position: 'absolute',
  },

  image2: {
    top: -330,
    left: -200,
    width: 639,
    height: 700,
  },
  image3:{
   width:20,
   height:20,
   top:-150, 
   left:-150,
  },

  input: {
    width: 300,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 17,
    paddingLeft: 20,
    top: 100,
    marginBottom: 20,
    color: '#000',
    fontSize: 16,
    fontFamily: "Asar"
  },

  sign: {
    fontSize: 27,
    fontFamily: "Asar",
    bottom: -120,
    left: -100,
  },
  btn2: {
    width: 40,
    height: 40,
    borderRadius: 25,
    padding: 10,
    right: -10,
    bottom: -10,
  },
  btnC: {
    backgroundColor: "#6C21DC",
    bottom: -60,
    right: -120,
    width: 60,
    height: 60,
    borderRadius: 35,
  },
  btn3: {
    fontSize: 16,
    fontFamily: "Asar"
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: 'row',
    position: "absolute",
    bottom: 30,
    zIndex: 999,

  },
 
  rightBtn: {
    marginLeft: 'auto',
    right: 120,
  },
  image4: {
    left: -10,
    bottom: 7,
  },
  image5: {
    left: 10,
    bottom: 7,
  },
  image10:{
    left: 10,
    bottom: 140,
  },
  image11:{
    left: 220,
    bottom: 140,
    zIndex:1
  },
  Esignup:{
    position:"absolute",
    left: -60,
    bottom: -80,
    color:"#555252"
  },
  icon1:{
    width:40,
    height:40,
    position:"absolute",
    left:-80,
    bottom:-140,
  },
  icon2:{
    width:40,
    height:40,
    position:"absolute",
    bottom:-140,
    left:-30,
    
  },
  icon3:{
    width:40,
    height:40,
    position:"absolute",
    bottom:-140,
    left:20,
  },
  circleB:{
position:"absolute",
right:-170,
bottom:-200,
width:383,
height:383,
  }
});
