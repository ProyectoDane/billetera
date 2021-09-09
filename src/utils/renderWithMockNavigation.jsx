// Vendor
import { render } from '@testing-library/react-native';

// Internal
import { getWithMockNavigation } from './mockNavigation';

// Agregar cuando usemos context
// const getWrapper =
//   (initialState = defaultState) =>
//   ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, initialState);
//     return (
//       <AppContext.Provider value={{ state, dispatch }}>
//         {children}
//       </AppContext.Provider>
//     );
//   };

/**
 *  This function, inject to the component the navigation context and props.
 *
 * @param ui Component we want to test example: Component.
 * @param params Params to pass inside of route params.
 * @param props Custom props to be pass to the component.
 * @param customNavigationProps Custom props to pass to the navigation.
 * @returns all the props and the render api.
 */
export const renderWithMockNavigation = (
  ui,
  state,
  params,
  props,
  customNavigationProps,
  route,
) => {
  const withMock = getWithMockNavigation({
    Component: ui,
    props,
    params,
    customNavigationProps,
    route,
  });

  // Agregar cuando usemos context
  // const Wrapper = getWrapper(state);
  // const renderApi = render(withMock.ui, { wrapper: Wrapper });

  // Borrar cuando usemos context
  const renderApi = render(withMock.ui);

  return {
    ...withMock.props,
    ...renderApi,
  };
};

export default renderWithMockNavigation;
