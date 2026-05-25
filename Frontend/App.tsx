import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding1, Onboarding2, Onboarding3 } from './components/HelloPages/HelloPages';
import { LoginScreen } from './components/LoginScreen/LoginScreen';
import { RegistrationScreen } from './components/RegistrationScreen/RegistrationScreen';
import { TrainingPage } from './components/MainPages/TrainingPage/TrainingPage';
import { ExcercisesPage } from './components/MainPages/ExcercisesPage/ExcercisesPage';
import { HomePage } from './components/MainPages/HomePage/HomePage';
import { TrainingSelector } from './components/MainPages/HomePage/TrainingSelector'
import { DateSelector } from './components/MainPages/HomePage/DateSelector'
import { TrainingItem } from './components/ReusableComponents/ComplexTypes'

export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Login: undefined;
  Registration: undefined;
  Training: undefined;
  Excercises: undefined;
  Home: undefined;
  TrainingSelector: undefined;
  DateSelector: { training: TrainingItem };
  
};

const Stack = createNativeStackNavigator<RootStackParamList>();
SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded, fontError] = useFonts({
	'BigShoulders-Thin': require('./assets/fonts/BigShoulders/big-shoulders-display.thin.ttf'),
	'BigShoulders-Light': require('./assets/fonts/BigShoulders/big-shoulders-display.light.ttf'),
	'BigShoulders-Regular': require('./assets/fonts/BigShoulders/big-shoulders-display.regular.ttf'),
	'BigShoulders-Medium': require('./assets/fonts/BigShoulders/big-shoulders-display.medium.ttf'),
	'BigShoulders-SemiBold': require('./assets/fonts/BigShoulders/big-shoulders-display.semibold.ttf'),
	'BigShoulders-Bold': require('./assets/fonts/BigShoulders/big-shoulders-display.bold.ttf'),
	'BigShoulders-ExtraBold': require('./assets/fonts/BigShoulders/big-shoulders-display.extrabold.ttf'),
	'BigShoulders-Black': require('./assets/fonts/BigShoulders/big-shoulders-display.black.ttf'),
	'SairaStencil-reg': require('./assets/fonts/Saira_Stencil_One/SairaStencilOne-Regular.ttf'),
	'Impact': require('./assets/fonts/impact/impact.ttf'),
	'Michroma-reg': require('./assets/fonts/Michroma/Michroma-Regular.ttf'),
	'Antonio': require('./assets/fonts/Antonio/Antonio-VariableFont_wght.ttf'),
	'ChakraPetch-ExtraLight': require('./assets/fonts/chakra-petch-2/ChakraPetch-ExtraLight.ttf'),
	'ChakraPetch-SemiBold': require('./assets/fonts/chakra-petch-2/ChakraPetch-SemiBold.ttf'),
	'ChakraPetch-Medium': require('./assets/fonts/chakra-petch-2/ChakraPetch-Medium.ttf'),
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
		<Stack.Screen name="TrainingSelector" component = {TrainingSelector}/>
		<Stack.Screen name="DateSelector" component = {DateSelector}/>
	  </Stack.Navigator>
	</NavigationContainer>
  );
}

export default App;