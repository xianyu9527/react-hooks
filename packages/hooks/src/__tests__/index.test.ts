import * as reactHooks from '..';
describe('react-hooks', () => {
  test('导出hooks都是可用的', () => {
    Object.keys(reactHooks).forEach((key) => {
      expect(reactHooks[key]).toBeDefined();
    });
  });
});
