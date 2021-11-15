import { showMessage } from 'react-native-flash-message';

// Options toast notificacion
// Message: Description for notification.
// Type: "success" (green), "warning" (orange), "danger" (red), "info" (blue) and "default" (gray).
// Icon: "none" (default), "auto" (guided by type), "success", "info", "warning", "danger"

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
