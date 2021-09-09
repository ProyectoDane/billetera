import { render, fireEvent } from '../../../utils/test-utils';

import HomeScreen from '..';

const setup = () => render(HomeScreen);
describe('Should render HomeScreen', () => {
  describe('General', () => {
    it('Should render Title', () => {
      const { getByText } = setup();

      expect(getByText(/cómopago/i)).toBeTruthy();
      expect(getByText(/virtual/i)).toBeTruthy();
    });
    it('Should render ButtonsComponent', () => {
      const { getAllByText, getByText } = setup();

      expect(getAllByText(/billetera/i)).toBeTruthy();
      expect(getAllByText(/1000/i)).toBeTruthy();
      expect(getByText(/ahorros/i)).toBeTruthy();
      expect(getByText(/1500/i)).toBeTruthy();
    });
  });
  describe('Navigation', () => {
    it('Should navigate to MyWallet', () => {
      const { getByText, navigation } = setup();

      const button = getByText('MI BILLETERA');

      fireEvent.press(button);

      expect(navigation.navigate).toBeCalledWith('MyWallet');
    });
    it('Should navigate to MySavings', () => {
      const { getByText, navigation } = setup();

      const button = getByText('MIS AHORROS');

      fireEvent.press(button);

      expect(navigation.navigate).toBeCalledWith('MySavings');
    });
  });
});
