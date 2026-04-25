import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "../../AppStyle"
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import React, { JSX, useCallback } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../../App";

interface PageLayoutProps {
    title: JSX.Element
    pageText: JSX.Element
    icon: JSX.Element
    buttonText: string
    onClick: () => void
}

function PageLayout({ title, pageText, icon, buttonText, onClick }: PageLayoutProps) {
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
                <View style={styles.iconBox}>{icon}</View>
                {title}
            </View>

            <View style={styles.titleBox}>
                {pageText}
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
        title={<Text style={styles.title}>WHAT’S GYMBRO ABOUT?</Text>}
        pageText={<Text style={styles.informationText}>First of it’s kind app that enables You to create a training plan suited especially for your needs.</Text>}
        icon={
            <svg width="33" height="65" viewBox="0 0 33 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.59 29.55C15.9 25.38 20.34 22.92 22.92 19.23C25.65 15.36 24.12 8.13 16.38 8.13C11.31 8.13 8.82 11.97 7.77 15.15L0 11.88C2.13 5.49 7.92 0 16.35 0C23.4 0 28.23 3.21 30.69 7.23C32.79 10.68 34.02 17.13 30.78 21.93C27.18 27.24 23.73 28.86 21.87 32.28C21.12 33.66 20.82 34.56 20.82 39H12.15C12.12 36.66 11.76 32.85 13.59 29.55ZM22.38 51C22.38 54.3 19.68 57 16.38 57C13.08 57 10.38 54.3 10.38 51C10.38 47.7 13.08 45 16.38 45C19.68 45 22.38 47.7 22.38 51Z" fill="#FBAF00" />
            </svg>
        }
        buttonText="CONTINUE"
        onClick={() => navigation.navigate('Onboarding2')}
    />
}

export function Onboarding2({ navigation }: StackScreenProps<RootStackParamList, 'Onboarding2'>) {
    return <PageLayout
        title={<Text style={styles.title}>
            PLAN SUITED JUST FOR <Text style={{ color: '#E83C15' }}>YOU</Text>
        </Text>}
        pageText={<Text style={styles.informationText}>The app is centered around providing that your training style needs. With our highly customizable pre-made training schemas you can achieve your goals faster & with better performance</Text>}
        icon={
            <svg width="71" height="65" viewBox="0 0 71 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.19252 43.2977C0.397506 42.5027 0 41.5853 0 40.5457C0 39.5061 0.397506 38.5887 1.19252 37.7937L23.3918 15.5945C24.1256 14.8606 24.9818 14.4937 25.9603 14.4937C26.9387 14.4937 27.7949 14.8606 28.5288 15.5945L40.6374 27.7032L64.1209 1.19252C64.7936 0.397508 65.6657 0 66.7371 0C67.8061 0 68.7075 0.36693 69.4414 1.10079C70.1141 1.77349 70.4664 2.58318 70.4982 3.52986C70.5275 4.47899 70.2058 5.32048 69.5331 6.05434L43.2059 35.7756C42.5332 36.5706 41.6624 36.984 40.5934 37.0158C39.522 37.0452 38.6193 36.6929 37.8855 35.9591L25.9603 24.0339L6.69646 43.2977C5.90145 44.0927 4.98412 44.4902 3.94449 44.4902C2.90486 44.4902 1.98753 44.0927 1.19252 43.2977Z" fill="#FBAF00" />
            </svg>

        }
        buttonText="I GET IT"
        onClick={() => navigation.navigate('Onboarding3')}
    />
}

export function Onboarding3({ navigation }: StackScreenProps<RootStackParamList, 'Onboarding3'>) {
    return <PageLayout
        title={<Text style={styles.title}>FIND YOUR GYMBRO</Text>}
        pageText={<Text style={styles.informationText}>With social features that our app provides You can effortlessly find a bro that matches your training style so that You can grow helping each other reach your targets!</Text>}
        icon={
            <svg width="72" height="65" viewBox="0 0 72 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.36 64.5C35.34 64.5 34.4856 64.156 33.7968 63.468C33.1056 62.7824 32.76 61.9319 32.76 60.9167C32.76 60.4986 32.85 60.065 33.03 59.6159C33.21 59.1692 33.48 58.7667 33.84 58.4083L50.49 41.8354L47.88 39.2375L31.32 55.8104C30.96 56.1688 30.57 56.4375 30.15 56.6167C29.73 56.7958 29.28 56.8854 28.8 56.8854C27.78 56.8854 26.9256 56.5414 26.2368 55.8534C25.5456 55.1678 25.2 54.3174 25.2 53.3021C25.2 52.7049 25.29 52.2116 25.47 51.8222C25.65 51.4352 25.89 51.0924 26.19 50.7937L42.84 34.2208L40.32 31.7125L23.67 48.1958C23.31 48.5542 22.92 48.8229 22.5 49.0021C22.08 49.1812 21.6 49.2708 21.06 49.2708C20.1 49.2708 19.26 48.9125 18.54 48.1958C17.82 47.4792 17.46 46.6431 17.46 45.6875C17.46 45.2097 17.55 44.7618 17.73 44.3438C17.91 43.9257 18.18 43.5375 18.54 43.1792L35.19 26.6063L32.58 24.0979L16.02 40.6708C15.72 40.9694 15.36 41.2083 14.94 41.3875C14.52 41.5667 14.01 41.6562 13.41 41.6562C12.39 41.6562 11.5356 41.3122 10.8468 40.6242C10.1556 39.9386 9.81 39.0882 9.81 38.0729C9.81 37.5951 9.9 37.1472 10.08 36.7292C10.26 36.3111 10.53 35.9229 10.89 35.5646L30.96 15.5875L44.46 29.1146C45.12 29.7715 45.9 30.2935 46.8 30.6805C47.7 31.0699 48.6 31.2646 49.5 31.2646C51.42 31.2646 53.1 30.5921 54.54 29.2472C55.98 27.9046 56.7 26.1882 56.7 24.0979C56.7 23.2618 56.55 22.3958 56.25 21.5C55.95 20.6042 55.41 19.7681 54.63 18.9917L38.52 2.95625C39.54 2.00069 40.68 1.2685 41.94 0.759666C43.2 0.253222 44.46 0 45.72 0C47.28 0 48.72 0.253222 50.04 0.759666C51.36 1.2685 52.56 2.06042 53.64 3.13542L68.85 18.3646C69.93 19.4396 70.7256 20.634 71.2368 21.9479C71.7456 23.2618 72 24.7847 72 26.5167C72 27.7111 71.73 28.9199 71.19 30.143C70.65 31.3685 69.87 32.4889 68.85 33.5042L38.88 63.425C38.4 63.9028 37.98 64.2014 37.62 64.3208C37.26 64.4403 36.84 64.5 36.36 64.5ZM5.49 35.8333L3.15 33.5042C2.13 32.5486 1.35 31.4139 0.81 30.1C0.27 28.7861 0 27.4125 0 25.9792C0 24.4264 0.3 22.9931 0.9 21.6792C1.5 20.3653 2.25 19.2604 3.15 18.3646L18.36 3.13542C19.32 2.17986 20.46 1.41781 21.78 0.84925C23.1 0.283083 24.39 0 25.65 0C27.27 0 28.71 0.224555 29.97 0.673667C31.23 1.12039 32.46 1.94097 33.66 3.13542L52.11 21.5C52.47 21.8583 52.74 22.2465 52.92 22.6646C53.1 23.0826 53.19 23.5306 53.19 24.0083C53.19 24.9639 52.83 25.8 52.11 26.5167C51.39 27.2333 50.55 27.5917 49.59 27.5917C49.05 27.5917 48.6 27.5164 48.24 27.3659C47.88 27.2178 47.49 26.9347 47.07 26.5167L30.87 10.5708L5.49 35.8333Z" fill="#FBAF00" />
            </svg>
        }
        buttonText="LET’S ROLL!"
        onClick={() => navigation.navigate('Login')}
    />
}