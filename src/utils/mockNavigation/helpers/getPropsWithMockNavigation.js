// Internal
import { navigation } from '../mocks';

/**
 * This functions wraps different props inside an only object.
 * @param params Params to put inside route: params
 * @param props  Props to pass to the component
 * @param navigationPropExtension : Props to pass to the navigation
 * @returns All the props with navigation mocked
 */
export const getPropsWithNavigation = (
  params = {},
  props = {},
  navigationPropExtension = {},
  route = {},
) => ({
  route: { ...route, params: { ...params } },
  ...props,
  navigation: {
    state: {},
    ...navigation,
    ...navigationPropExtension,
  },
});
