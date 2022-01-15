import { getOrigin } from '../src';

test('should return http://localhost', () => {
  const origin = getOrigin({});

  expect(origin).toBe('http://localhost');
});
