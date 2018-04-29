import React from 'react';
import { shallow } from 'enzyme';
import Board from '../components/Board';

test('<Board/> renders correctly', () => {
  const component = shallow(<Board />);
  expect(component).toMatchSnapshot();
});
