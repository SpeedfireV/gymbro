import { View, Text, TouchableOpacity, TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { Ionicons } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../../App";

export function RegistrationScreen({ navigation }: StackScreenProps<RootStackParamList, 'Registration'>){

  const [emailText, setEmailText] = useState('');
  const [passwrodText, setPasswordText] = useState('');
  const [passwrodRepText, setPasswordRepText] = useState('');
  const [isPasswordVis, setPasswordVis] = useState(false);
  const [isRepPasswordVis, setRepPasswordVis] = useState(false);

  const handleRegistration = () => {
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

    if (passwrodText != passwrodRepText) {
	  console.log('Pass length fail');
	  alert('Repeated password is diffrent, than provided password.');
	  return;
	}

	console.log('Registration attempt');
  };

  const handleLogin = () => {
	navigation.navigate('Login');
  }

  const changePassVis = () =>{
	setPasswordVis(!isPasswordVis);
  }

  const changeRepPassVis = () =>{
	setRepPasswordVis(!isRepPasswordVis);
  }


  return (
	<View style={styles.container}>
	  <View style={styles.titleBox}>
		<Text style={styles.title}>REGISTER</Text>
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
        <Text style={styles.textBold}>Repeat Password</Text>
        <View style={styles.frameContainer}>
		  <TextInput
			style={styles.frameText}
			placeholder="Repeat your super ULTRA secure pasword"
			placeholderTextColor="#777777"
			value={passwrodRepText}
			onChangeText={setPasswordRepText}
			autoCapitalize="none"
			secureTextEntry={!isRepPasswordVis}
		  />
		  <TouchableOpacity
			onPress={changeRepPassVis}>
			<Ionicons
			  name={isRepPasswordVis ? "eye-off" : "eye"}
			  size={30}
			  color="#aaa"
			/>
		  </TouchableOpacity>


		</View>
		<TouchableOpacity
		  style={styles.button}
		  onPress={handleRegistration}
		  activeOpacity={0.7}
		>
		  <Text style={styles.buttonText}>REGISTER</Text>
		</TouchableOpacity>

	  </View>
	  <View style={styles.bottomBox}>
		<Text style={styles.text}>Already have an account?</Text>
		<TouchableOpacity onPress={handleLogin}>
		  <Text style={styles.textGold}>LOGIN</Text>
		</TouchableOpacity>
	  </View>
	</View>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#121212',
	paddingHorizontal: 20,
  },
  titleBox:{
	paddingTop: 80,
	marginBottom: 80,
	justifyContent: 'center',
	alignItems: 'center',
  },
  conteceBox:{
	flex: 9,
	justifyContent: 'flex-start',
  },
  bottomBox:{
	flex: 2,
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'flex-end',
	paddingBottom: 30,
  },

  title: {
	fontFamily: 'SairaStencil-reg',
	color: '#FBAF00',
	textAlign: 'center',
	fontSize: 40,
	lineHeight: 40,
	transform: [
	  { scaleY: 1.5 },
	  { scaleX: 0.9 }
	],
  },

  textBold: {
	color: '#ffffff',
	fontSize: 18,
	fontFamily: 'Impact-Local',
	paddingTop: 25
  },
  text: {
	color: '#ffffff',
	fontSize: 16,
	fontFamily: 'Antonio'
  },
  textGold: {
	color: '#FFB700',
	fontSize: 16,
	fontFamily: 'Antonio',
  },

  button: {
	marginTop: 30,
	backgroundColor: '#FFB700',
	borderRadius: 10,
	width: '100%',
	height: 90,
	justifyContent: 'center',
	alignItems: 'center',
	paddingBottom: 10,
	paddingTop: 10
  },

  buttonText: {
	color: '#000000',
	fontSize: 20,
	transform: [
	  { scaleY: 1.4 },
	  { scaleX: 1.1 }
	],
	fontFamily: 'Impact'
  },

  frameContainer:{
	flexDirection: 'row',
	backgroundColor: '#222222',
	borderColor: '#FFFFFF',
	fontSize: 16,
	marginTop: 5,
	borderWidth: 1,
	borderRadius: 5,
	paddingRight: 10,
	width: '100%',
	alignItems: 'center',
  },

  frameText: {
	flex: 1,
	fontFamily: 'ChakraPetch-ExtraLight',
	color: '#fff8e5',
	fontSize: 12,
  },
});

