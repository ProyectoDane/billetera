import { fireEvent, render } from 'test-utils';

import CustomButton from '..';

const setup = (props) =>
  render(CustomButton, undefined, undefined, props, undefined, undefined);
describe('Should render Custom Button', () => {
  describe('Generals', () => {
    it('Should bring a label and amount in Button', () => {
      const { getByText } = setup({ label: 'MI BILLETERA', amount: 1000 });

      expect(getByText(/mi billetera/i)).toBeTruthy();
      expect(getByText(/1000/i)).toBeTruthy();
    });
    it('Should find the buttons "COMPRAR" and "AGREGAR / QUITAR"', () => {
      const { getByText } = setup();

      expect(getByText(/COMPRAR/i)).toBeTruthy();
      expect(getByText(/AGREGAR/i)).toBeTruthy();
    });
  });
  describe('Navigations', () => {
    it('Should navigate to AddRemove screen', () => {
      const { getByText, navigation } = setup();

      const button = getByText('AGREGAR / QUITAR');
      fireEvent.press(button);

      expect(navigation.navigate).toBeCalledWith('AddRemove');
    });
    it('Should navigate to Buy screen', () => {
      const { getByText, navigation } = setup();

      const button = getByText('COMPRAR');
      fireEvent.press(button);

      expect(navigation.navigate).toBeCalledWith('Buy');
    });
  });
});
