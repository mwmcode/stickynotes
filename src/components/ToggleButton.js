import React from 'react';
import {
  bool,
  string,
  func,
} from 'prop-types';

import './ToggleButton.css';

const ToggleButton = ({ on, onToggle, className, ...props }) => (
  <div className='toggle'>
    <input className='toggle-input' type='checkbox' />

    <button
      {...props}
      onClick={onToggle}
      aria-expanded={on}
      className={`${className} toggle-btn ${on ? 'toggle-btn-on' : 'toggle-btn-off'}`}
    />
  </div>
);

ToggleButton.propTypes = {
  on: bool,
  onToggle: func,
  className: string,
};

ToggleButton.defaultProps = {
  on: false,
  onToggle: ()=>{},
  className: ''
};

export default ToggleButton;
