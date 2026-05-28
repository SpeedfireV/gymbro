import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Sports from '../../../assets/icons/sports.svg'
import Time from '../../../assets/icons/time.svg'
import { GBSmallButton } from "../../ReusableComponents/GBSmallButton"
import ArrowBack from '../../../assets/icons/arrow_back.svg'
import Delete from '../../../assets/icons/delete.svg'
import Edit from '../../../assets/icons/edit.svg'
import ArrowLeft from '../../../assets/icons/arrow_left.svg'
import ArrowRight from '../../../assets/icons/arrow_right.svg'
import { GBBigButton } from "../../ReusableComponents/GBBigButton";
import PublishToBroScienceButton from "../../ReusableComponents/PublishToBroScienceButton";


export function ExercisePage() {

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <GBSmallButton bgColor='#FBAF00' icon={<ArrowBack width={24} height={24} />} onPress={() => {}} />

          <Text style={styles.exerciseTitle}>PULL UPS</Text>
        </View>
        <GBSmallButton bgColor={'#E03616'} icon={<Delete width={24} height={24}  />} onPress={() => {}} />

      </View>

      <View style={[styles.imageRow]}>
        <TouchableOpacity style={{backgroundColor: '#FBAF00',  borderRadius: 45, padding: 8}}>
          <ArrowLeft width={24} height={24} fill={'#ffffff'}/>
        </TouchableOpacity>
        <View></View> 
        <TouchableOpacity style={{backgroundColor: '#FBAF00', borderRadius: 45, padding: 8}}>
          <ArrowRight width={24} height={24} fill={'#ffffff'}/>
        </TouchableOpacity>
      </View>
      <View style={styles.metaRow}>
        <View style={styles.metaLeft}>
          <Sports width={24} height={24} style={styles.metaIcon} />
          < Text style={styles.metaLabel}>BODY PARTS</Text>
        </View >
        <Text style={styles.metaValue}>Triceps</Text>
      </View>

      <Text style={styles.description}>
        The best training for your legs & not only that! Extensive training that improves your whole body!
      </Text>
      <View style={styles.spacer}></View>
      <View style={styles.footerRow}>

        <PublishToBroScienceButton />
        <GBBigButton bgColor='#FBAF00' icon={<Edit width={32} height={32} />} onPress={() => {}} />


      </View>

    </View >
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 48,
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  exerciseTitle: {
    fontFamily: 'BigShoulders-ExtraBold',
    fontSize: 36,
    color: '#FFFFFF',
    marginLeft: 16,
  },
  imageRow: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 24,
  },
  metaLeft: {
    flexDirection: 'row',
  },
  metaIcon: {
    marginRight: 16,
  },
  metaLabel: {
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  metaValue: {
    fontFamily: 'ChakraPetch-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  description: {
    fontFamily: 'ChakraPetch-Regular',
    fontSize: 16,
    color: '#EFF1F3',
    textAlign: 'center',
    marginHorizontal: 24,
  },
  spacer: {
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignContent: 'center',
    alignItems: 'center',
    height: 64,
    marginBottom: 32,
    marginHorizontal: 24,
  },


}

);
