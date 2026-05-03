import { View, Text, TouchableOpacity, TextInput} from 'react-native';
import { styles } from "../../AppStyle"
import React, {useState} from 'react';
import { Ionicons } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../../App";

export function LoginScreen({ navigation }: StackScreenProps<RootStackParamList, 'Login'>) {

  const [emailText, setEmailText] = useState('');
  const [passwrodText, setPasswordText] = useState('');
  const [isPasswordVis, setPasswordVis] = useState(false);

  const handleLogin = () => {
	console.log('AttemptLogEmail: ', emailText);
	console.log('AttemptLogPass: ', passwrodText);
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	// Email
	if (!emailRegex.test(emailText)) {
	  console.log('Email Fail');
	  alert('Wrong Email');
	  return;
	}

	// PassCap
	if (!/[A-Z]/.test(passwrodText)) {
	  console.log('Pass capitalization Fail');
	  alert('Wrong password(No capitalized letter)');
	  return;
	}

	// PassSmall
	if (!/[a-z]/.test(passwrodText)) {
	  console.log('Pass small letter Fail');
	  alert('Wrong password(No small letter)');
	  return;
	}

	// PassLength
	if (passwrodText.length < 8) {
	  console.log('Pass length fail');
	  alert('Wrong password, too short. Must be longer than eight characters');
	  return;
	}

	console.log('Login attempt');
  };

  const handleRegistration = () => {
	navigation.navigate('Registration');
  }

  const changePassVis = () =>{
	setPasswordVis(!isPasswordVis);
  }


  return (
	<View style={styles.container}>
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
		<TouchableOpacity onPress={handleRegistration}>
		  <Text style={styles.textGold}>Register</Text>
		</TouchableOpacity>
	  </View>
	</View>
  );
}

