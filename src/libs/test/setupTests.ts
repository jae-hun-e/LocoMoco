import '@testing-library/jest-dom';
import { server } from '../../mocks/node';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
  server.close();
});

vi.mock('zustand');
