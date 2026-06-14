import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../../config/api';

export  const handleLogin = async (
  emailText: string,
  passwordText: string,
  navigation: StackNavigationProp<RootStackParamList, "Login">) => {
    
  
    console.log("AttemptLogEmail: ", emailText);
    console.log("AttemptLogPass: ", passwordText);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email
    if (!emailRegex.test(emailText)) {
      console.log("Email Fail");
      alert("Wrong Email");
      return;
    }

    // PassCap
    if (!/[A-Z]/.test(passwordText)) {
      console.log("Pass capitalization Fail");
      alert("Wrong password(No capitalized letter))");
      return;
    }

    // PassSmall
    if (!/[a-z]/.test(passwordText)) {
      console.log("Pass small letter Fail");
      alert("Wrong password(No small letter)");
      return;
    }

    // PassLength
    if (passwordText.length < 8) {
      console.log("Pass length fail");
      alert("Wrong password, too short. Must be longer than eight characters");
      return;
    }

    try {

    const response = await fetch(getApiUrl('/api/login/'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailText,
        password: passwordText,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Success! Logged correctly", data);
      if (data.access) {
        await AsyncStorage.setItem('userToken', data.access);
        await AsyncStorage.setItem('refreshToken', data.refresh);
      }
      navigation.navigate("Home");
    } else {
      console.log("Login Fail from Backend:", data);
      alert(data.detail || "E-mail password error");
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Failed backend connection");
  }

};