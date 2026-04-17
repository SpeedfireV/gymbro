import { View, Text, TouchableOpacity, TextInput} from 'react-native';
import { styles } from './AppStyle';
import * as SplashScreen from 'expo-splash-screen';
import React, {useState, useCallback} from 'react';
import { Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {

  const [emailText, setEmailText] = useState('');
  const [passwrodText, setPasswordText] = useState('');
  const [isPasswordVis, setPasswordVis] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    'SairaStencil-reg': require('./assets/fonts/Saira_Stencil_One/SairaStencilOne-Regular.ttf'),
    'Impact': require('./assets/fonts/impact/impact.ttf'),
    'Michroma-reg': require('./assets/fonts/Michroma/Michroma-Regular.ttf'),
    'Antonio': require('./assets/fonts/Antonio/Antonio-VariableFont_wght.ttf')
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const handleLogin = () => {
    console.log('AttemptLogEmail: ', emailText);
    console.log('AttemptLogPass: ', passwrodText);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    // Email
    if (!emailRegex.test(emailText)) {
      console.log('Email Fail');
      alert('Niepoprawny Email');
      return;
    }

    // PassCap
    if (!/[A-Z]/.test(passwrodText)) {
      console.log('Pass capitalization Fail');
      alert('Błędne hasło(Brak dużej litery))');
      return;
    }

    // PassSmall
    if (!/[a-z]/.test(passwrodText)) {
      console.log('Pass small letter Fail');
      alert('Błędne hasło(Brak małej litery))');
      return;
    }

    // PassLength
    if (passwrodText.length < 8) {
      console.log('Pass length fail');
      alert('Błędne hasło(Za mało znaków))');
      return;
    }
    
    console.log('Próba logowania');
  };

  const handleRegistry = () => {


    alert('Rejestracja!');
  }

  const changePassVis = () =>{
    setPasswordVis(!isPasswordVis);
  }

  if (!fontsLoaded && !fontError) return null;

  return (
    
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>LOGIN</Text>
      </View>
      <View style={styles.conteceBox}>
        <Text style={styles.textBold}>Email</Text>
        <View style={styles.frameContainer}>
          <TextInput
            style={styles.frameText}
            placeholder="example@mail.com"
            placeholderTextColor="#777777"
            value={emailText}
            onChangeText={setEmailText}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <Text style={styles.textBold}>Password</Text>
        <View style={styles.frameContainer}>
          <TextInput
            style={styles.frameText}
            placeholder="Enter your super secure pasword"
            placeholderTextColor="#777777"
            value={passwrodText}
            onChangeText={setPasswordText}
            autoCapitalize="none"
            secureTextEntry={!isPasswordVis}
          />
          <TouchableOpacity 
            onPress={changePassVis}>
            <Ionicons 
              name={isPasswordVis ? "eye-off" : "eye"} 
              size={30} 
              color="#aaa" 
            />
          </TouchableOpacity>


        </View>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.bottomBox}>
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleRegistry}>
          <Text style={styles.textGold}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

