import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../App";

interface NavigationBarProps {
  activeTab: keyof RootStackParamList;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeTab }) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity 
        onPress={() => {
            navigation.navigate('Home') 
            console.log('Went to page: ', activeTab);
            }
        } 
        style={styles.navItem}
        
      >
        <Ionicons 
          name="calendar-outline" 
          size={30} 
          color={activeTab === 'Home' ? '#FFB800' : '#FFF'} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => {
            navigation.navigate('Training') 
            console.log('Went to page: ', activeTab);
            }} 
        style={styles.navItem}
      >
        <Ionicons 
          name="home-outline" 
          size={30} 
          color={activeTab === 'Training' ? '#FFB800' : '#FFF'} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => {
            navigation.navigate('Excercises') 
            console.log('Went to page: ', activeTab);
            }} 
        style={styles.navItem}
      >
        <Ionicons 
          name="barbell-outline" 
          size={30} 
          color={activeTab === 'Excercises' ? '#FFB800' : '#FFF'} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#333',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 15,
  },
  navItem: { padding: 10 },
});

export default NavigationBar;