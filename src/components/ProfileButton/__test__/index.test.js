import { render, fireEvent } from 'test-utils';

import ProfileButton from '..';
import { SCREEN_NAME } from '../../../constants';

const mockedNavigation = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useRoute: jest.fn(() => ({ name: 'CALCULADORA' })),
    useNavigation: jest.fn(() => ({ navigate: mockedNavigation })),
  };
});

const defaultprops = {
  name: SCREEN_NAME.CALCULATOR,
};
const setup = (props = defaultprops) =>
  render(
    ProfileButton,
    undefined,
    undefined,
    { sizeIcon: 40, colorIcon: 'menu' },
    undefined,
    props,
  );

describe('Should render ProfileButton', () => {
  beforeEach(() => jest.clearAllMocks());
  it('Should find ID Button', () => {
    const { getByAccessibilityLabel } = setup();

    expect(getByAccessibilityLabel(/boton de perfil/i)).toBeTruthy();
  });
  it('Should change color and size', () => {
    const { getByAccessibilityLabel } = setup();

    const button = getByAccessibilityLabel(/boton de perfil/i);

    expect(button.props.color).toBe('#12264a');
    expect(button.props.size).toBe(40);
  });
  it('Should navigate to Profile Screen', () => {
    const { getByAccessibilityLabel } = setup();

    const button = getByAccessibilityLabel(/boton de perfil/i);

    fireEvent.press(button);

    expect(mockedNavigation).toHaveBeenCalledTimes(1);
  });
});
