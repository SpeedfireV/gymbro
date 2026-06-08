import React, { createContext, useContext } from 'react'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
})

type StylesType = typeof styles
const ExerciseStylesContext = createContext<StylesType>(styles)

export const ExerciseStylesProvider = ({ children }: { children: React.ReactNode }) => {
  return <ExerciseStylesContext.Provider value={styles}>{children}</ExerciseStylesContext.Provider>
}

export const useExerciseStyles = () => useContext(ExerciseStylesContext)

export default styles
