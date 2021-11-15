import { showMessage } from 'react-native-flash-message';

export const toastNotification = (message, type, icon) => {
  showMessage({
    message: message,
    position: { bottom: 70 },
    floating: true,
    duration: 3500,
    type: type,
    icon: icon,
    titleStyle: { textAlign: 'center', fontWeight: 'bold' },
  });
};
