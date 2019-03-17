/* eslint react/require-default-props:0 */
import React from 'react';
import {
  EmojiIcon,
  ToggleButton,
 } from 'reuseables';
import {
  ThemeContext,
} from 'CONSTANTS';
import Select from './partials/Dropdown';
import {
  DROP_DOWNS,
} from './CONSTANTS';

import './styles.css';

export default class SettingsPanel extends React.Component {
  state = {
    show: false,
  };
 
  toggleSettings = () => this.setState({show: !this.state.show});
  
  render() {
    const { show } = this.state;
    const Selects = DROP_DOWNS.map(obj => <Select key={obj.propKey} {...obj} />);

    return (
      <React.Fragment>
        <EmojiIcon
          aria-label='gear sign'
          className='settings-emoji'
          onClick={this.toggleSettings}
          data-testid='ti-settings-btn'
        >
          {show ? '✖️' : '⚙'}️
        </EmojiIcon>
        <span className={`${show ? 'board-settings settings-panel' : 'hide'}`} >
          <ThemeContext.Consumer>
            {({ defaultBoardStyle: { daylight }, updateBoardStyle }) =>
              <span className='daylight-mode-toggle'>
                <EmojiIcon
                  className='daylight-mode-emojies'
                  aria-label='moon emoji'
                >
                  🌙
                </EmojiIcon>
                <ToggleButton
                  on={daylight}
                  onClick={() => updateBoardStyle({ daylight: !daylight })}
                  data-testid='ti-daylight-btn'
                />
                <EmojiIcon
                  className='daylight-mode-emojies'
                  aria-label='sun emoji'
                >
                  🌞
                </EmojiIcon>            
              </span>
            }
          </ThemeContext.Consumer>
    
          {Selects}

        {/* <EmojiIcon
          className=''
          aria-label=''
        >
          🔁 sort
        </EmojiIcon> */}
        </span>
      </React.Fragment>
    );
  }
}
