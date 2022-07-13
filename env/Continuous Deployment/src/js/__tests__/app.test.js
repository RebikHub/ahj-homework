import demo from '../app';

test('should value', () => {
  const value = 'Current variable.';

  expect(demo(value)).toBe('Current variable.');
});
