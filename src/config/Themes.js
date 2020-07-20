import { breakPoints } from './breakpoints';

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
  pink: '#FF009C',
  red: '#FF1958',
  blue: '#4C6BF5',
}

export const darkTheme = {
  body: '#2C2A43',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#999',
  ...categoryColors,
  ...globalColors,
  ...breakPoints,
}

export const lightTheme = {
  body: '#FFF',
  text: '#fff',
  toggleBorder: '#FFF',
  background: '#363537',
  ...categoryColors,
  ...globalColors,
  ...breakPoints,
}
