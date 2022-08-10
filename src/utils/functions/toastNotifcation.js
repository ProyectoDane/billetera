import {showMessage} from 'react-native-flash-message';
import {Alert} from "react-native";

const createTwoButtonAlert = (title, message) =>
    Alert.alert(
        title,
        message,
        [
            // {
            //   text: "Cancel",
            //   onPress: () => console.log("Cancel Pressed"),
            //   style: "cancel"
            // },
            {text: "OK", }
        ]
    );

// Options toast notificacion
// Message: Description for notification.
// Type: "success" (green), "warning" (orange), "danger" (red), "info" (blue) and "default" (gray).
// Icon: "none" (default), "auto" (guided by type), "success", "info", "warning", "danger"

export const toastNotification = (message, type, icon) => {
    function dameTitulo() {
        switch (type) {
            case "success":
                return "EXITO";
            case "warning":
                return "ADVERTENCIA";
            case "danger":
                return "PELIGRO";
            case "info":
            default:
                return "INFORMACION";
        }
    }

    const titulo = dameTitulo();
    createTwoButtonAlert(titulo, message);
    if (true)
        return;
    showMessage({
        message: message,
        position: "center",
        floating: false,
//    duration: 3500,
        autoHide: false,
        type: type,
        icon: icon,
        hideStatusBar: true,
        titleStyle: {textAlign: 'center', fontWeight: 'bold'},
    });
};
