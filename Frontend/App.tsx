import * as SplashScreen from 'expo-splash-screen';
import React, {useState, useCallback, useEffect} from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding1, Onboarding2, Onboarding3 } from './components/HelloPages/HelloPages';
import { LoginScreen } from './components/LoginScreen/LoginScreen';
import { RegistrationScreen } from './components/RegistrationScreen/RegistrationScreen';
import { TrainingPage } from './components/MainPages/TrainingPage';
import { ExcercisesPage } from './components/MainPages/ExcercisesPage';
import { HomePage } from './components/MainPages/HomePage';

export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Login: undefined;
  Registration: undefined;
  Training: undefined;
  Excercises: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded, fontError] = useFonts({
	'SairaStencil-reg': require('./assets/fonts/Saira_Stencil_One/SairaStencilOne-Regular.ttf'),
	'Impact': require('./assets/fonts/impact/impact.ttf'),
	'Michroma-reg': require('./assets/fonts/Michroma/Michroma-Regular.ttf'),
	'Antonio': require('./assets/fonts/Antonio/Antonio-VariableFont_wght.ttf')
  });

  useEffect(() => {
	if (fontsLoaded || fontError) {
	  SplashScreen.hideAsync();
	}
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
	<NavigationContainer>
	  <Stack.Navigator
		initialRouteName="Onboarding1"
		screenOptions={{ headerShown: false }}
	  >
		<Stack.Screen name="Onboarding1" component={Onboarding1} />
		<Stack.Screen name="Onboarding2" component={Onboarding2} />
		<Stack.Screen name="Onboarding3" component={Onboarding3} />
		<Stack.Screen name="Login" component={LoginScreen} />
		<Stack.Screen name="Registration" component={RegistrationScreen} />
		<Stack.Screen name="Training" component={TrainingPage} />
		<Stack.Screen name="Home" component={HomePage} />
		<Stack.Screen name="Excercises" component={ExcercisesPage} />
	  </Stack.Navigator>
	</NavigationContainer>
  );
}

export default App;