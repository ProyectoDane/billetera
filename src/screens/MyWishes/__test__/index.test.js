import { render, fireEvent } from '../../../utils/test-utils';
import { Alert } from 'react-native';

import MyWishes from '../../MyWishes';

const setup = () => render(MyWishes);

//TODO: reemplazar testIds
describe('Should render MyWishes screen', () => {
  describe('Generals', () => {
    it('Should render button NewWish ', () => {
      const { getByText } = setup();

      expect(getByText(/nuevo deseo/i)).toBeTruthy();
    });
    it('Should navigation to NewWish Screen ', () => {
      const { getByText, navigation } = setup();
      const button = getByText('NUEVO DESEO');

      fireEvent.press(button);
      expect(navigation.navigate).toBeCalledWith('NewWish');
    });
    it('Should render ItemWish', () => {
      const { getAllByText } = setup();

      expect(getAllByText(/valor/i)).toBeTruthy();
    });
  });
  describe('Component ItemWish', () => {
    it('Should render ItemWish', () => {
      const { getAllByText } = setup();

      expect(getAllByText(/valor/i)).toBeTruthy();
    });
    it('Should press the button and collapse details', () => {
      const { getByTestId, getAllByText } = setup();

      const button = getByTestId('testId-itemWish-1');
      fireEvent.press(button);

      expect(getAllByText(/ahorrado/i)).toBeTruthy();
      expect(getAllByText(/faltan/i)).toBeTruthy();
    });
    it('Should press the edit button and navigate to screen "NewWish" ', () => {
      const { getByText, getByTestId, navigation } = setup();

      const button = getByTestId('testId-itemWish-1');
      fireEvent.press(button);

      const editBtn = getByText('EDITAR');
      fireEvent.press(editBtn);

      expect(navigation.navigate).toBeCalledWith('NewWish', {
        icon: 'bicycle',
        name: 'BICICLETA',
        value: '3000',
      });
    });
    it('Should press the delete button and show an alert', () => {
      const { getByText, getByTestId } = setup();

      const button = getByTestId('testId-itemWish-1');
      fireEvent.press(button);

      const deleteBtn = getByText('ELIMINAR');
      fireEvent.press(deleteBtn);

      expect(Alert.alert).toBeCalledWith(
        'Advertencia',
        'Estas seguro que queres eliminar tu deseo?',
      );
    });
    it('Should press the achieve button and show an alert', () => {
      const { getByText, getByTestId } = setup();

      const button = getByTestId('testId-itemWish-2');
      fireEvent.press(button);

      const achieveBtn = getByText('CUMPLIR');
      fireEvent.press(achieveBtn);

      expect(Alert.alert).toBeCalledWith(
        'FELICIDADES! CUMPLISTE TU DESEO !! 🎉',
        ` TUS AHORROS RESTANTES SON $500`,
        [{ text: 'OK' }],
      );
    });
  });
});
