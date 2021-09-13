// import React from 'react';
// import { WebView } from 'react-native-webview';

// import { labels } from '../../../constants';

// import Survey from '../index';

// import { render, waitFor, fireEvent, act } from '@testing-library/react-native';

// const setup = async () => await waitFor(() => render(<Survey />));

// // jest.mock('react', () => {
// //   const originReact = jest.requireActual('react');
// //   const mUseRef = jest.fn(() => ({
// //     current: { stopLoading: jest.fn() }
// //   }));
// //   return {
// //     ...originReact,
// //     useRef: mUseRef
// //   };
// // });

// describe('Survey screen', () => {
//   it('should render without crashing', () => {
//     setup();
//   });
//   it('should show congrats and repeat when submit survey', async () => {
//     // const useRefSpy = jest
//     //   .spyOn(React, 'useRef')
//     //   .mockReturnValueOnce({ current: { stopLoading: jest.fn() } });
//     // React.useRef = jest.fn(() => ({ current: { stopLoading: jest.fn() } }));

//     // console.log('wb: ', wb);

//     const { getByTestId, debug } = await setup();
//     const wb = getByTestId('survey-web-view');

//     // await act(async () => {
//     //   fireEvent(wb, 'onNavigationStateChange', { canGoBack: false });
//     // });

//     // await act(async () => {
//     //   const wb = getByTestId('survey-web-view');
//     //   fireEvent(wb, 'onNavigationStateChange', { canGoBack: true });
//     // });
//   });
// });
