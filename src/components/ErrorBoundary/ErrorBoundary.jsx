import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        // Actualiza el estado para mostrar la interfaz de usuario de error
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Puedes enviar los detalles del error a un servicio de monitoreo de errores
        console.error("Error captured by ErrorBoundary:", error, info);
    }

    componentDidMount() {
        SplashScreen.hideAsync();  // Ocultar la pantalla de carga cuando esté listo
    }

    render() {
        if (this.state.hasError) {
            // Muestra una interfaz personalizada para mostrar el error
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Algo salió mal. Vuelve a intentar.</Text>
                    <Button title="Reintentar" onPress={() => this.setState({ hasError: false })} />
                </View>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
