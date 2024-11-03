import { load } from '@expo/env';

import { refreshMemory } from '~/lib/store';

beforeEach(() => {
  load(process.cwd());
  jest.mock('react-native/Libraries/Utilities/Platform', () => {
    return { isTesting: true };
  });
});

afterEach(() => {
  refreshMemory();
});
