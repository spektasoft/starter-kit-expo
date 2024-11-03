import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', { caller: { preserveEnvVars: true } }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
};

export default config;
