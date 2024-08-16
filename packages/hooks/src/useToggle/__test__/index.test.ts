import { renderHook, act } from '@testing-library/react';
import useToggle from '../index';
// act 立即执行函数

const callUseToggle = (hook) => {
  act(() => {
    hook.result.current[1].toggle();
  });
};
describe('useToggle', () => {
  it('空参数时是否为false', () => {
    const hook = renderHook(() => useToggle());
    expect(hook.result.current[0]).toBeFalsy();
  });
  it("测试两个值，'hello' 'world 初始值'", () => {
    const hook = renderHook(() => useToggle('hello', 'world'));
    expect(hook.result.current[0]).toBe('hello');
  });
  it("测试两个值，'hello' 'world 切换值", () => {
    const hook = renderHook(() => useToggle('hello', 'world'));
    callUseToggle(hook);
    expect(hook.result.current[0]).toBe('world');
  });
});
