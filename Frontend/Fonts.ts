export const fonts = {
  bigShouldersThin: 'BigShoulders-Thin',
  bigShouldersLight: 'BigShoulders-Light',
  bigShouldersRegular: 'BigShoulders-Regular',
  bigShouldersMedium: 'BigShoulders-Medium',
  bigShouldersSemiBold: 'BigShoulders-SemiBold',
  bigShouldersBold: 'BigShoulders-Bold',
  bigShouldersExtraBold: 'BigShoulders-ExtraBold',
  bigShouldersBlack: 'BigShoulders-Black',
  sairaStencilReg: 'SairaStencil-reg',
  impact: 'Impact',
  michromaReg: 'Michroma-reg',
  antonio: 'Antonio',
  chakraPetchExtraLight: 'ChakraPetch-ExtraLight',
  chakraPetchExtraLightItalic: 'ChakraPetch-ExtraLightItalic',
  chakraPetchLight: 'ChakraPetch-Light',
  chakraPetchLightItalic: 'ChakraPetch-LightItalic',
  chakraPetchRegular: 'ChakraPetch-Regular',
  chakraPetchItalic: 'ChakraPetch-Italic',
  chakraPetchMedium: 'ChakraPetch-Medium',
  chakraPetchMediumItalic: 'ChakraPetch-MediumItalic',
  chakraPetchSemiBold: 'ChakraPetch-SemiBold',
  chakraPetchSemiBoldItalic: 'ChakraPetch-SemiBoldItalic',
  chakraPetchBold: 'ChakraPetch-Bold',
  chakraPetchBoldItalic: 'ChakraPetch-BoldItalic',
} as const;

export type FontPalette = typeof fonts;
export type FontToken = keyof FontPalette;
export type FontValue = FontPalette[FontToken];