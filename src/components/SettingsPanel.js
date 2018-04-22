import React from 'react';
import { ThemeContext } from './Board';
import {
  FONT_SIZES,
  FONT_FAMILIES,
  BG_COLOR_CODES,
  FONT_COLOR_CODES,
} from '../CONSTANTS';

import './SettingsPanel.css';

const Select = ({propKey='', optionsObj={}}) => (
  <ThemeContext.Consumer>
    { ({style, update}) =>
      <select
        value={style[propKey]}
        onChange={e=> update({[propKey]: e.target.value})}
      >
        {Object.keys(optionsObj).map(k =>
          <option
            key={k}
            value={optionsObj[k]}
          >
            {k}
          </option>
        )}
      </select>
    }
  </ThemeContext.Consumer>
);



const SettingsPanel = () => (
  <span className='settings-panel'>
    <Select
      propKey='background'
      optionsObj={BG_COLOR_CODES}
    />
    <Select
      propKey='color'
      optionsObj={FONT_COLOR_CODES}
    />
    <Select
      propKey='fontFamily'
      optionsObj={FONT_FAMILIES}
    />
    <Select
      propKey='fontSize'
      optionsObj={FONT_SIZES}
    />
  </span>
);


export default SettingsPanel;
