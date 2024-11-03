import { load } from '@expo/env';

beforeEach(() => {
  load(process.cwd());
  jest.mock('react-native/Libraries/Utilities/Platform', () => {
    return { isTesting: true };
  });
});
