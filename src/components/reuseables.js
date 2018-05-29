import React from 'react';
import './reuseables.css';

export const EmojiIcon = ({children, ...props}) => (<span role='img' {...props}>{children}</span>);


export const ToggleButton = ({ on=false, className='', ...props }) => (
  <div className='toggle'>
    <input className='toggle-input' type='checkbox' />

    <button
      {...props}
      aria-expanded={on}
      className={`${className} toggle-btn ${on ? 'toggle-btn-on' : 'toggle-btn-off'}`}
    />
  </div>
);


