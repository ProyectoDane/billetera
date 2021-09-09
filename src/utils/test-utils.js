import customRender from './renderWithMockNavigation';

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
