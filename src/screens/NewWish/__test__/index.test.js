import { fireEvent, render, waitFor } from '../../../utils/test-utils';

import NewWish from '../../NewWish';

const setup = () => render(NewWish);

describe('Should render NewWish screen', () => {
  describe('Generals', () => {
    it('Should find title and input label', () => {
      const { getByText } = setup();

      expect(getByText(/nombre/i)).toBeTruthy();
      expect(getByText(/valor/i)).toBeTruthy();
    });
    it('Should find button, press it, and show error message', async () => {
      const { getByText, queryByText } = setup();

      const button = getByText('CREAR DESEO');
      fireEvent.press(button);

      await waitFor(() => {
        expect(queryByText(/campo requerido/i)).toBeTruthy();
      });
    });
  });
  describe('Inputs', () => {
    it('Should change icon from carousel to the left', () => {
      const { queryByAccessibilityLabel } = setup();

      const buttonLeft = queryByAccessibilityLabel(/previous icon/i);
      const icon = queryByAccessibilityLabel(/wish icon/i);
      fireEvent.press(buttonLeft);

      expect(icon.props.name).toEqual('binoculars');
    });
    it('Should change icon from carousel to the right', () => {
      const { queryByAccessibilityLabel } = setup();

      const buttonRight = queryByAccessibilityLabel(/next icon/i);
      const icon = queryByAccessibilityLabel(/wish icon/i);
      fireEvent.press(buttonRight);

      expect(icon.props.name).toEqual('car');
    });
    it('Should write a name', () => {
      const { getByPlaceholderText } = setup();

      const input = getByPlaceholderText('INGRESE EL NOMBRE DEL DESEO');
      fireEvent.changeText(input, 'PELOTA');

      expect(input.props.value).toEqual('PELOTA');
    });
    it('Should write a value', () => {
      const { getByPlaceholderText } = setup();

      const input = getByPlaceholderText('INGRESE EL VALOR DEL DESEO');
      fireEvent.changeText(input, '1000');

      expect(input.props.value).toEqual('1000');
    });
  });
  describe('Navigation', () => {
    it('Should complete the form, submit it and navigate to WishList screen', async () => {
      const {
        getByPlaceholderText,
        queryByAccessibilityLabel,
        getByText,
        navigation,
      } = setup();

      const buttonRight = queryByAccessibilityLabel(/next icon/i);
      const inputValue = getByPlaceholderText('INGRESE EL VALOR DEL DESEO');
      const button = getByText('CREAR DESEO');

      fireEvent.press(buttonRight);
      fireEvent.changeText(inputValue, '1000');
      await waitFor(() => fireEvent.press(button));

      expect(navigation.navigate).toBeCalledWith('MyWishes');
    });
  });
});
