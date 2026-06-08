export const colors = {
  fireRed: '#e03616',
  activeYellow: '#fbaf00',
  coffeeBackground: '#322214',
  blueSlate: '#39393a',
  platiniumWhite: '#eff1f3',
  background: '#111111',
  onSurface: '#181818',
  inputBackground: '#242423',
} as const;

export type ColorPalette = typeof colors;
export type ColorToken = keyof ColorPalette;
export type ColorValue = ColorPalette[ColorToken];