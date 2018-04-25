import React from 'react';
import { ThemeContext } from './Board';
import {
  EmojiIcon,
  ToggleButton,
 } from './reuseables';
import {
  FONT_SIZES,
  FONT_FAMILIES,
  BG_COLOR_CODES,
  FONT_COLOR_CODES,
} from '../CONSTANTS';

import './SettingsPanel.css';

const Select = ({propKey='', optionsObj={}}) => (
  <ThemeContext.Consumer>
    { ({defaultNoteStyle, updateNoteStyle}) =>
      <select
        value={defaultNoteStyle[propKey]}
        onChange={e=> updateNoteStyle({[propKey]: e.target.value})}
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
    <ThemeContext.Consumer>
      { ({defaultBoardStyle: {nightMode} , updateBoardStyle}) =>
        <span className='night-mode-toggle'>
          <ToggleButton
          on={!nightMode}
          onClick={()=>updateBoardStyle({nightMode: !nightMode})}
        />
        <EmojiIcon
          className='night-mode-emojies'
          aria-label='sun or moon emoji'
        >
          {nightMode ? '🌙' : '🌤'}
        </EmojiIcon>
        </span>
      }
    </ThemeContext.Consumer>

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
    {/* <EmojiIcon
      className=''
      aria-label=''
    >
      🔁 sort
    </EmojiIcon> */}
  </span>
);


export default SettingsPanel;
