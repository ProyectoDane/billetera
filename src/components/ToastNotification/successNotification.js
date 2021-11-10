import { showMessage } from 'react-native-flash-message';

export const successNotification = () => {
  showMessage({
    message: 'LA COMPRA SE REALIZÓ CORRECTAMENTE!',
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
    message: 'EL DESEO SE CUMPLIÓ CORRECTAMENTE!',
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
    message: 'EL DESEO SE ELIMINÓ CORRECTAMENTE!',
    position: { bottom: 70 },
    floating: true,
    duration: 3500,
    type: 'danger',
    icon: 'success',
    titleStyle: { textAlign: 'center', fontWeight: 'bold' },
  });
};
export const newWishNotification = () => {
  showMessage({
    message: 'EL DESEO SE CREÓ CORRECTAMENTE!',
    position: { bottom: 70 },
    floating: true,
    duration: 3500,
    type: 'success',
    icon: 'success',
    titleStyle: { textAlign: 'center', fontWeight: 'bold' },
  });
};
export const editWishNotification = () => {
  showMessage({
    message: 'EL DESEO SE EDITÓ CORRECTAMENTE!',
    position: { bottom: 70 },
    floating: true,
    duration: 3500,
    type: 'success',
    icon: 'success',
    titleStyle: { textAlign: 'center', fontWeight: 'bold' },
  });
};
