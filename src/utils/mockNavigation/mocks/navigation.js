/**
 * This is used like navigation recived from props.
 * you can do assertions from this functions.
 */
export const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  closeDrawer: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  isFocused: jest.fn().mockReturnValue(true),
  addListener: jest.fn(() => jest.fn(() => true)),
};
