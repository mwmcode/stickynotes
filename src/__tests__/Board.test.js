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
import Board from '../components/Board';
import {
  STORAGE_KEY,
} from '../CONSTANTS';


// test('<Board /> renders correctly', () => {
//   const { getByLabelText, getByTestId, getByText } = render(<Board />);

//   const add = getByTestId('tid-add-not-btn');

//   const spy = jest.fn()

//   fireEvent(new MouseEvent('click', {
//     bubbles: true, // click events must bubble for React to see it
//     cancelable: true,
//   }));

//   expect(spy).toHaveBeenCalledTimes(1)
// });




describe('Add New Note ➕ functionality', () => {
  const { getByTestId } = render(<Board />);
  fireEvent.click(getByTestId('tid-add-note-btn'));
  
  test('calls localStorage.setItem', () => {
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  test('localStorage notes count ++', () => {
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))['notes'].length).toEqual(1);
  });
});
