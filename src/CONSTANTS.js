import React from 'react';

export const ThemeContext = React.createContext('ThemeContext');

export const STORAGE_KEY = '__STICKYNOTES__V2__';

export const NIGHT_BG_COLOR = '#26292B';

export const BG_COLOR_CODES = {
  'Red': '#F44336',
  'Blue': '#2196F3',
  'Light green': '#8BC34A',
  'Yellow': '#FDD835',
  'Teal': '#009688',
  'Lime': '#CDDC39',
  'Purple': '#9C27B0',
  'Pink': '#E91E63',
  'Orange': '#FF9800',
  'Whitesmoke': '#F1EDED',
};

export const FONT_COLOR_CODES = {
  'White': 'white',
  'Black': 'black',
};

export const FONT_SIZES = {
  'Small': '14px',
  'Medium': '19px',
  'Large': '24px',
  'X-Large': '29px',
};

export const FONT_FAMILIES = {
  'Fantasy': 'fantasy',
  'Cursive': 'cursive',
  'Mono Space': 'monospace',
  'Serif': 'serif',
  'San Serif': 'sans-serif',
};

export const DEFAULT_STORAGE_STATE = {
  notes: [],
  noteStyle: {
    color: FONT_COLOR_CODES.Black,
    background: BG_COLOR_CODES.Whitesmoke,
    fontSize: FONT_SIZES.Large,
    fontFamily: FONT_FAMILIES.Fantasy,
  },
  boardStyle: {
    daylight: false,
  }
};

