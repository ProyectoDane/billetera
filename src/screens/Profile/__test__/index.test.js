// TODO: HACER TEST

// import React from 'react';

// import { labels } from '../../../constants';

// import Perfil from '../../Perfil';
// import * as dataAccesUser from '../../../dataAccess/User';

// import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

// jest.mock('expo-image-picker', () => {
//   const resultPermission = Promise.resolve({ granted: true });
//   const resultImageLibrary = Promise.resolve({
//     cancelled: false,
//     uri: 'file://ImageLibraryTest'
//   });
//   const resultCamera = Promise.resolve({
//     cancelled: false,
//     uri: 'file://CameraTest'
//   });
//   return {
//     requestMediaLibraryPermissionsAsync: jest.fn(() => resultPermission),
//     launchImageLibraryAsync: jest.fn(() => resultImageLibrary),
//     requestCameraPermissionsAsync: jest.fn(() => resultPermission),
//     launchCameraAsync: jest.fn(() => resultCamera),
//     MediaTypeOptions: { All: 'All' }
//   };
// });

// const setup = async () => await waitFor(() => render(<Perfil />));

// describe('Profile screen', () => {
//   beforeAll(() => {
//     const userResolve = Promise.resolve({
//       data: { name: ' ', photo: '', id: 1 }
//     });
//     dataAccesUser.getUser = jest.fn(() => userResolve);
//     dataAccesUser.updatePhoto = jest.fn(() => null);
//     dataAccesUser.updateName = jest.fn(() => null);
//   });

//   afterAll(() => {
//     jest.clearAllMocks();
//   });

//   it('should render without crashing', async () => {
//     const { getByPlaceholderText, getAllByRole } = await setup();

//     getByPlaceholderText(labels.insertName);

//     const buttons = getAllByRole('button');
//     expect(buttons.length).toBe(2);
//   });

//   it('when change name, it should show new one', async () => {
//     const { getByPlaceholderText, getByDisplayValue } = await setup();
//     const input = getByPlaceholderText(labels.insertName);

//     await act(async () => {
//       await fireEvent(input, 'onChangeText', 'Juan Perez');
//     });

//     getByDisplayValue(/Juan Perez/);
//   });

//   it('when change photo, it should show image', async () => {
//     const { getAllByRole, getByRole } = await setup();

//     const buttons = getAllByRole('button');

//     for (let i = 0; i < buttons.length; i++) {
//       await act(async () => {
//         await fireEvent(buttons[i], 'onPress');
//       });

//       const image = getByRole('image');
//       const file =
//         buttons[i].parent.parent.props.icon === 'image'
//           ? 'file://ImageLibraryTest'
//           : 'file://CameraTest';

//       expect(image.props.source.uri).toBe(file);
//     }
//   });
// });

// describe('Profile screen with error find user', () => {
//   beforeAll(() => {
//     const userResolve = Promise.reject();
//     dataAccesUser.getUser = jest.fn(() => userResolve);
//     dataAccesUser.updatePhoto = jest.fn(() => null);
//     dataAccesUser.updateName = jest.fn(() => null);

//     console.log = jest.fn();
//   });

//   afterAll(() => {
//     jest.clearAllMocks();
//   });

//   it('should render without crasing and empty', async () => {
//     const { getByPlaceholderText } = await setup();
//     const input = getByPlaceholderText(labels.insertName);

//     expect(input.props.value).toBeFalsy();
//     expect(console.log).toBeCalledTimes(1);
//   });
// });

// describe('Profile screen not find user and retorn empty', () => {
//   beforeAll(() => {
//     const userResolve = Promise.resolve({});
//     dataAccesUser.getUser = jest.fn(() => userResolve);
//     dataAccesUser.updatePhoto = jest.fn(() => null);
//     dataAccesUser.updateName = jest.fn(() => null);
//   });

//   afterAll(() => {
//     jest.clearAllMocks();
//   });

//   it('should render without crasing and empty', async () => {
//     const { getByPlaceholderText } = await setup();
//     const input = getByPlaceholderText(labels.insertName);

//     expect(input.props.value).toBeUndefined();
//   });
// });
