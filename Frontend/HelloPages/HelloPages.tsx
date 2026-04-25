import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "../AppStyle"
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React, { useCallback } from 'react';

interface PageLayoutProps {
    title: string
    buttonText: string
}

function PageLayout({ title, buttonText }: PageLayoutProps) {
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

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    )
}

export function Onboarding1() {
    return <PageLayout
        title=""
        buttonText=""
    />
}