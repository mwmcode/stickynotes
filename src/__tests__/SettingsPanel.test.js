
/* eslint prefer-destructuring:0 */
/* eslint no-underscore-dangle:0 */
/* eslint no-underscore-dangle:0 */
/* eslint dot-notation:0 */

import React from 'react';
import {
  cleanup,
  render, 
  fireEvent,
} from 'react-testing-library';
import SettingsPanel from 'SettingsPanel';
import {
  ThemeContext,
} from 'CONSTANTS';
import {
  ThemeContextMockValue,
} from 'test_helpers';

afterEach(cleanup);


describe('Settings Panel functionality', () => {
  // render
  const { container, getByTestId } = render(
    <ThemeContext.Provider value={ThemeContextMockValue}>
      <SettingsPanel />
    </ThemeContext.Provider>
  );
});
