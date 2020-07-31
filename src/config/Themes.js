import { breakPoints } from './breakpoints';
import backgroundWaveDark from '../assets/images/background-wave-dark.svg';
import backgroundWaveLight from '../assets/images/background-wave-light.svg';

const categoryColors = {
  esports: '#4C6BF5',
  politics: '#0004FF',
  crypto: '#5400FF',
  startups: '#7400DA',
  stockmarket: '#C45DFF',
  meme: '#FF00FD',
  viral: '#FF009C',
  sports: '#FF1958',
}

const globalColors = {
  purple: '#A743FF',
  darkPurle: '#2a293f',
  lightPurple: '#5400FF',
  pink: '#FF009C',
  red: '#FF1958',
  blue: '#4C6BF5',
  mediumBlue: '#2C2A43',
  darkBlue: '#0F0E25',
  green: '#C4FF88',
  gray: '#7E7E91',
  white: '#ffffff',
  black: '#000000',
}

export const darkTheme = {
  body: '#2C2A43',
  text: '#ffffff',
  background: '#0C0B1D',
  contentCardBackground: '#0F0E25',
  backgroundWave: backgroundWaveDark, 
  ...categoryColors,
  ...globalColors,
  ...breakPoints,
}

export const lightTheme = {
  body: '#FFF',
  text: '#000000',
  background: '#ffffff',
  contentCardBackground: '#ffffff',
  backgroundWave: backgroundWaveLight,
  ...categoryColors,
  ...globalColors,
  ...breakPoints,
}
