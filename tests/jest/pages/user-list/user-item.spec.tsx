import '@testing-library/jest-dom';
import { TUser } from '@pages/user-list/type';
import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import { UserItem } from '../../../../src/pages/user-list/components/user-item/index';

export const testUser: TUser = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};
describe('User item component', () => {
  // test 1: snapshot
  test('1. Should render component properly', () => {
    const componentRenderer = renderer.create(<UserItem user={testUser} />);
    const tree = componentRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // test 2: test rendering
  test('2. Should render props correctly', () => {
    render(<UserItem user={testUser} />);
    expect(screen.getByTestId('user-name')).toHaveTextContent(`Name: ${testUser?.name}`);
    expect(screen.getByTestId('company-name')).toHaveTextContent(`Company: ${testUser?.company?.name}`);
    expect(screen.getByTestId('address')).toHaveTextContent(
      `Adress: ${testUser?.address?.suite ?? ''}, ${testUser?.address?.street ?? ''}, ${
        testUser?.address?.zipcode ?? ''
      }, ${testUser?.address?.city ?? ''}`,
    );
  });
});
