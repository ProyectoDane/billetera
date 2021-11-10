import { showMessage } from 'react-native-flash-message';

export const successNotification = () => {
  showMessage({
    message: 'LA COMPRA SE REALIZO CORRECTAMENTE!',
    position: { bottom: 70 },
    floating: true,
    duration: 3500,
    type: 'success',
    icon: 'success',
    titleStyle: { textAlign: 'center', fontWeight: 'bold' },
  });
};

export const successFulfillWishNotification = () => {
  showMessage({
    message: 'EL DESEO SE CUMPLIO CORRECTAMENTE!',
    position: { bottom: 70 },
    floating: true,
    duration: 3500,
    type: 'success',
    icon: 'success',
    titleStyle: { textAlign: 'center', fontWeight: 'bold' },
  });
};
export const successDeleteWishNotification = () => {
  showMessage({
    message: 'EL DESEO SE ELIMINO CORRECTAMENTE!',
    position: { bottom: 70 },
    floating: true,
    duration: 3500,
    type: 'danger',
    icon: 'success',
    titleStyle: { textAlign: 'center', fontWeight: 'bold' },
  });
};
