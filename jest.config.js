module.exports = {
  preset: 'jest-expo',
  transform: {
    '\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  coveragePathIgnorePatterns: [
    'src/utils',
    'src/constants',
    'src/navigation',
    'src/validations',
    'src/mockData/deseos.js',
    'src/screens/FulfillWish',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleDirectories: [
    'node_modules',
    // add the directory with the test-utils.js file, for example:
    'utils', // a utility folder
    __dirname, // the root directory
  ],
};
