import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Ciemne tło
    paddingHorizontal: 20,
  },
  titleBox:{
    flex: 9,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  conteceBox:{
    flex: 9,
    justifyContent: 'flex-start',
  },
  bottomBox:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },

  title: {
    fontFamily: 'SairaStencil-reg',
    color: '#FFB700',
    fontSize: 40,
    transform: [
      { scaleY: 1.5 },
      { scaleX: 0.9 }
    ],
  },

  textBold: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Impact-Local',
    paddingTop: 25
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Antonio'
  },
  textGold: {
    color: '#FFB700',
    fontSize: 16,
    fontFamily: 'Antonio',
  },

  button: {
    marginTop: 30,
    backgroundColor: '#FFB700',
    borderRadius: 10,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10
  },

  buttonText: {
    color: '#000000',
    fontSize: 20,
    transform: [
      { scaleY: 1.4 },
      { scaleX: 1.1 }
    ],
    fontFamily: 'Impact'
  },

  frameContainer:{
    flexDirection: 'row',
    backgroundColor: '#222222',
    borderColor: '#FFFFFF',
    fontSize: 16,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    paddingRight: 10,
    width: '100%',
    alignItems: 'center',
  },

  frameText: {
    flex: 1,
    fontFamily: 'Michroma-reg',
    fontSize: 12,
  }
});