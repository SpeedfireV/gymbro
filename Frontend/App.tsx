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

const bigShouldersFonts = {
	BigShouldersThin: require('./assets/fonts/static/BigShoulders-Thin.ttf'),
	BigShouldersExtraLight: require('./assets/fonts/static/BigShoulders-ExtraLight.ttf'),
	BigShouldersLight: require('./assets/fonts/static/BigShoulders-Light.ttf'),
	BigShouldersRegular: require('./assets/fonts/static/BigShoulders-Regular.ttf'),
	BigShouldersMedium: require('./assets/fonts/static/BigShoulders-Medium.ttf'),
	BigShouldersSemiBold: require('./assets/fonts/static/BigShoulders-SemiBold.ttf'),
	BigShouldersBold: require('./assets/fonts/static/BigShoulders-Bold.ttf'),
	BigShouldersExtraBold: require('./assets/fonts/static/BigShoulders-ExtraBold.ttf'),
	BigShouldersBlack: require('./assets/fonts/static/BigShoulders-Black.ttf'),
	BigShoulders18Thin: require('./assets/fonts/static/BigShoulders_18pt-Thin.ttf'),
	BigShoulders18ExtraLight: require('./assets/fonts/static/BigShoulders_18pt-ExtraLight.ttf'),
	BigShoulders18Light: require('./assets/fonts/static/BigShoulders_18pt-Light.ttf'),
	BigShoulders18Regular: require('./assets/fonts/static/BigShoulders_18pt-Regular.ttf'),
	BigShoulders18Medium: require('./assets/fonts/static/BigShoulders_18pt-Medium.ttf'),
	BigShoulders18SemiBold: require('./assets/fonts/static/BigShoulders_18pt-SemiBold.ttf'),
	BigShoulders18Bold: require('./assets/fonts/static/BigShoulders_18pt-Bold.ttf'),
	BigShoulders18ExtraBold: require('./assets/fonts/static/BigShoulders_18pt-ExtraBold.ttf'),
	BigShoulders18Black: require('./assets/fonts/static/BigShoulders_18pt-Black.ttf'),
	BigShoulders24Thin: require('./assets/fonts/static/BigShoulders_24pt-Thin.ttf'),
	BigShoulders24ExtraLight: require('./assets/fonts/static/BigShoulders_24pt-ExtraLight.ttf'),
	BigShoulders24Light: require('./assets/fonts/static/BigShoulders_24pt-Light.ttf'),
	BigShoulders24Regular: require('./assets/fonts/static/BigShoulders_24pt-Regular.ttf'),
	BigShoulders24Medium: require('./assets/fonts/static/BigShoulders_24pt-Medium.ttf'),
	BigShoulders24SemiBold: require('./assets/fonts/static/BigShoulders_24pt-SemiBold.ttf'),
	BigShoulders24Bold: require('./assets/fonts/static/BigShoulders_24pt-Bold.ttf'),
	BigShoulders24ExtraBold: require('./assets/fonts/static/BigShoulders_24pt-ExtraBold.ttf'),
	BigShoulders24Black: require('./assets/fonts/static/BigShoulders_24pt-Black.ttf'),
	BigShoulders36Thin: require('./assets/fonts/static/BigShoulders_36pt-Thin.ttf'),
	BigShoulders36ExtraLight: require('./assets/fonts/static/BigShoulders_36pt-ExtraLight.ttf'),
	BigShoulders36Light: require('./assets/fonts/static/BigShoulders_36pt-Light.ttf'),
	BigShoulders36Regular: require('./assets/fonts/static/BigShoulders_36pt-Regular.ttf'),
	BigShoulders36Medium: require('./assets/fonts/static/BigShoulders_36pt-Medium.ttf'),
	BigShoulders36SemiBold: require('./assets/fonts/static/BigShoulders_36pt-SemiBold.ttf'),
	BigShoulders36Bold: require('./assets/fonts/static/BigShoulders_36pt-Bold.ttf'),
	BigShoulders36ExtraBold: require('./assets/fonts/static/BigShoulders_36pt-ExtraBold.ttf'),
	BigShoulders36Black: require('./assets/fonts/static/BigShoulders_36pt-Black.ttf'),
	BigShoulders60Thin: require('./assets/fonts/static/BigShoulders_60pt-Thin.ttf'),
	BigShoulders60ExtraLight: require('./assets/fonts/static/BigShoulders_60pt-ExtraLight.ttf'),
	BigShoulders60Light: require('./assets/fonts/static/BigShoulders_60pt-Light.ttf'),
	BigShoulders60Regular: require('./assets/fonts/static/BigShoulders_60pt-Regular.ttf'),
	BigShoulders60Medium: require('./assets/fonts/static/BigShoulders_60pt-Medium.ttf'),
	BigShoulders60SemiBold: require('./assets/fonts/static/BigShoulders_60pt-SemiBold.ttf'),
	BigShoulders60Bold: require('./assets/fonts/static/BigShoulders_60pt-Bold.ttf'),
	BigShoulders60ExtraBold: require('./assets/fonts/static/BigShoulders_60pt-ExtraBold.ttf'),
	BigShoulders60Black: require('./assets/fonts/static/BigShoulders_60pt-Black.ttf'),
};

function App() {
  const [fontsLoaded, fontError] = useFonts({
	...bigShouldersFonts,
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