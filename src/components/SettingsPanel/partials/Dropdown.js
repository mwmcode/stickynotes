/* eslint react/require-default-props:0 */
import React from 'react';
import {
  string,
  object,
} from 'prop-types';
import {
  ThemeContext,
} from 'CONSTANTS';

const Select = ({propKey='', optionsObj={}}) => (
  <ThemeContext.Consumer>
    { ({defaultNoteStyle, updateNoteStyle}) =>
      <select
        value={defaultNoteStyle[propKey]}
        onChange={e=> updateNoteStyle({[propKey]: e.target.value})}
        data-testid={`ti-${propKey}-select`}
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

Select.propTypes = {
  propKey: string,
  optionsObj: object,
};

export default Select;
