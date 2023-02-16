import '@testing-library/jest-dom';
import { TUser } from '@pages/user-list/type';
import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import TextInput from '../../../../src/pages/refactor-class/components/input/index';

const formItem = {
  name: 'email',
  value: 'an existed value',
  placeholder: 'enter your email',
  onChange: (value: string) => {},
};
describe('Text input component', () => {
  // test 1: snapshot
  test('1. Should render component properly', () => {
    const componentRenderer = renderer.create(<TextInput {...formItem} type="text" />);
    const tree = componentRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // test 2
  test('2. Should render props correctly', () => {
    render(<TextInput {...formItem} type="text" />);
    expect(screen.getByTestId('wrapper')).toBeVisible();
    expect(screen.getByTestId('input')).toHaveAttribute('name', formItem.name);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'text');
    expect(screen.getByTestId('input')).toHaveAttribute('placeholder', formItem.placeholder);
    expect(screen.getByTestId('input')).toHaveAttribute('value', formItem.value);
  });
});
