import { getOrigin } from '../src';

test('should return default origin', () => {
  const origin = getOrigin({});

  expect(origin).toBe('http://localhost');
});

test('should return a custom domain host', () => {
  const origin = getOrigin({
    host: 'custom.domain'
  });

  expect(origin).toBe('http://custom.domain');
});

test('should return a custom port', () => {
  const origin = getOrigin({
    port: 8888,
  });

  expect(origin).toBe('http://localhost:8888');
});

test('should return HTTPS protocol ', () => {
  const origin = getOrigin({
    https: true,
  });

  expect(origin).toBe('https://localhost');
});

test('should return a custom full address ', () => {
  const origin = getOrigin({
    host: 'edersoares.test',
    port: 3000,
    https: true,
  });

  expect(origin).toBe('https://edersoares.test:3000');
});
