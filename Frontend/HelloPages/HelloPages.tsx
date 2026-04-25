import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "../AppStyle"
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React, { useCallback } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../App";

interface PageLayoutProps {
    title: string
    buttonText: string
    onClick: () => void
}

function PageLayout({ title, buttonText, onClick }: PageLayoutProps) {
    const [fontsLoaded, fontError] = useFonts({
        'SairaStencil-reg': require('../assets/fonts/Saira_Stencil_One/SairaStencilOne-Regular.ttf'),
        'Impact': require('../assets/fonts/impact/impact.ttf'),
        'Michroma-reg': require('../assets/fonts/Michroma/Michroma-Regular.ttf'),
        'Antonio': require('../assets/fonts/Antonio/Antonio-VariableFont_wght.ttf')
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) return null;

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>GymBro</Text>
            </View>

            <View style={styles.titleBox}>
                <Text style={styles.informationText}>{title}</Text>
            </View>

            <View style={styles.bottomBox}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onClick}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export function Onboarding1({ navigation }: StackScreenProps<RootStackParamList, 'Onboarding1'>) {
    return <PageLayout
        title="Witamy w aplikacji GYMBRO..."
        buttonText="kontynuuj"
        onClick={() => navigation.navigate('Onboarding2')}
    />
}

export function Onboarding2({ navigation }: StackScreenProps<RootStackParamList, 'Onboarding2'>) {
    return <PageLayout
        title="Aplikacja oferuje liczne funkcje..."
        buttonText="Rozumiem"
        onClick={() => navigation.navigate('Onboarding3')}
    />
}

export function Onboarding3({ navigation }: StackScreenProps<RootStackParamList, 'Onboarding3'>) {
    return <PageLayout
        title="Życzymy przyjemnych wrażeń..."
        buttonText="Zaczynajmy"
        onClick={() => navigation.navigate('Login')}
    />
}