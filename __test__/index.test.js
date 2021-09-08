import React from 'react'
import { render } from '@testing-library/react-native';

import App from "../App"

const setup = () => render(<App/>);

describe('Onboarding screen', () => {
  it('Should render', () => {
    const { getByText } = setup();

    expect(getByText(/open/i)).toBeTruthy();
  });
});