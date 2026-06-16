import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Onboarding1,
  Onboarding2,
  Onboarding3,
} from "./components/HelloPages/HelloPages";
import { LoginScreen } from "./components/AuthPages/LoginPage/LoginPage";
import { RegistrationPage } from "./components/AuthPages/RegistrationPage/RegistrationPage";
import { TrainingsPage } from "./components/MainPages/TrainingsPages/TrainingsPage/TrainingsPage";
import { TrainingDetailsPage } from "./components/MainPages/TrainingsPages/TrainingDetails/TrainingDetailsPage";
import { EditTrainingDetailsPage } from "./components/MainPages/TrainingsPages/EditTrainingDetails/EditTrainingDetailsPage";
import { NewTrainingDetailsPage } from "./components/MainPages/TrainingsPages/EditTrainingDetails/NewTrainingDetailsPage";
import { HomePage } from "./components/MainPages/HomePage/HomePage";
import { TrainingSelector } from "./components/MainPages/HomePage/TrainingSelector";
import { DateSelector } from "./components/MainPages/HomePage/DateSelector";
import { ExerciseItem, TrainingItem } from "./components/ReusableComponents/ComplexTypes";
import { ExercisePage } from "./components/MainPages/ExcercisesPages/ExercisePage/ExercisePage";
import { ExercisesPage } from "./components/MainPages/ExcercisesPages/ExercisesPage/ExercisesPage";
import { ActivitiesInspector } from "./components/MainPages/HomePage/ActivitiesInspector"
import ExerciseEditPage from "./components/MainPages/ExcercisesPages/EditExercise/EditExercisePage";
import AddNewExercisePage from "./components/MainPages/ExcercisesPages/AddNewExercise/AddNewExercisePage";

export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Login: undefined;
  Registration: undefined;
  Training: undefined;
  Exercises: undefined;
  Exercise: { exercise: any };
  AddNewExercise: undefined;
  ExerciseEditPage: undefined;
  Home: undefined;
  ActivitiesInspector: undefined;
  TrainingSelector: undefined;
  DateSelector: { training: TrainingItem };
  TrainingDetail: { training: TrainingItem };
  EditTrainingDetail: { training: TrainingItem };
  NewTrainingDetail: { training: TrainingItem };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded, fontError] = useFonts({
    "BigShoulders-Thin": require("./assets/fonts/BigShoulders/big-shoulders-display.thin.ttf"),
    "BigShoulders-Light": require("./assets/fonts/BigShoulders/big-shoulders-display.light.ttf"),
    "BigShoulders-Regular": require("./assets/fonts/BigShoulders/big-shoulders-display.regular.ttf"),
    "BigShoulders-Medium": require("./assets/fonts/BigShoulders/big-shoulders-display.medium.ttf"),
    "BigShoulders-SemiBold": require("./assets/fonts/BigShoulders/big-shoulders-display.semibold.ttf"),
    "BigShoulders-Bold": require("./assets/fonts/BigShoulders/big-shoulders-display.bold.ttf"),
    "BigShoulders-ExtraBold": require("./assets/fonts/BigShoulders/big-shoulders-display.extrabold.ttf"),
    "BigShoulders-Black": require("./assets/fonts/BigShoulders/big-shoulders-display.black.ttf"),
    "SairaStencil-reg": require("./assets/fonts/Saira_Stencil_One/SairaStencilOne-Regular.ttf"),
    Impact: require("./assets/fonts/impact/impact.ttf"),
    "Michroma-reg": require("./assets/fonts/Michroma/Michroma-Regular.ttf"),
    Antonio: require("./assets/fonts/Antonio/Antonio-VariableFont_wght.ttf"),
    "ChakraPetch-ExtraLight": require("./assets/fonts/chakra-petch-2/ChakraPetch-ExtraLight.ttf"),
    "ChakraPetch-ExtraLightItalic": require("./assets/fonts/chakra-petch-2/ChakraPetch-ExtraLightItalic.ttf"),
    "ChakraPetch-Light": require("./assets/fonts/chakra-petch-2/ChakraPetch-Light.ttf"),
    "ChakraPetch-LightItalic": require("./assets/fonts/chakra-petch-2/ChakraPetch-LightItalic.ttf"),
    "ChakraPetch-Regular": require("./assets/fonts/chakra-petch-2/ChakraPetch-Regular.ttf"),
    "ChakraPetch-Italic": require("./assets/fonts/chakra-petch-2/ChakraPetch-Italic.ttf"),
    "ChakraPetch-Medium": require("./assets/fonts/chakra-petch-2/ChakraPetch-Medium.ttf"),
    "ChakraPetch-MediumItalic": require("./assets/fonts/chakra-petch-2/ChakraPetch-MediumItalic.ttf"),
    "ChakraPetch-SemiBold": require("./assets/fonts/chakra-petch-2/ChakraPetch-SemiBold.ttf"),
    "ChakraPetch-SemiBoldItalic": require("./assets/fonts/chakra-petch-2/ChakraPetch-SemiBoldItalic.ttf"),
    "ChakraPetch-Bold": require("./assets/fonts/chakra-petch-2/ChakraPetch-Bold.ttf"),
    "ChakraPetch-BoldItalic": require("./assets/fonts/chakra-petch-2/ChakraPetch-BoldItalic.ttf"),
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
        <Stack.Screen name="Registration" component={RegistrationPage} />
        <Stack.Screen name="Training" component={TrainingsPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Exercises" component={ExercisesPage} />
        <Stack.Screen name="Exercise" component={ExercisePage} />
        <Stack.Screen name="TrainingSelector" component={TrainingSelector} />
        <Stack.Screen name="DateSelector" component={DateSelector} />
        <Stack.Screen name="TrainingDetail" component={TrainingDetailsPage} />
        <Stack.Screen
          name="EditTrainingDetail"
          component={EditTrainingDetailsPage}
        />
        <Stack.Screen
          name="NewTrainingDetail"
          component={NewTrainingDetailsPage}
        />
        <Stack.Screen name="AddNewExercise" component={AddNewExercisePage} />
        <Stack.Screen name="ExerciseEditPage" component={ExerciseEditPage} />
        <Stack.Screen name="ActivitiesInspector" component={ActivitiesInspector} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
