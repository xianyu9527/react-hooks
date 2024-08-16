import { useMemo, useState } from 'react';
// useToggle

// 1.defaultValue
// 2.defaultValue reverseValue true false
// 3. defaultValue left reverseValue right
// 定义一个空的函数类型
type noop = () => void;
// 定义 Action
export interface Action<T> {
  setLeft: noop;
  setRight: noop;
  toggle: noop;
  set: (value: T) => void;
}
// 重载
/**
 * useToggle 用于在两个状态值间切换的 Hook。
 * @param defaultValue 可选项，传入默认的状态值，默认为 false
 * @param reverseValue 可选项，传入取反的状态值
 * @returns 返回一个元组，其中第一个元素为当前状态值，第二个元素为一个包含操作集合的对象
 */
function useToggle<T = boolean>(): [boolean, Action<T>];
function useToggle<T>(defaultValue: T): [T, Action<T>];
function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Action<T | U>];
function useToggle<D, R>(defaultValue: D = false as D, reverseValue?: R) {
  // 使用 useState 创建状态值和更新状态的函数
  const [state, setState] = useState<D | R>(defaultValue);

  // 使用 useMemo 创建一个包含操作集合的对象
  const action = useMemo(() => {
    // 计算 reverseValueOrigin，如果 reverseValue 未传入，则计算为 defaultValue 的取反
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;

    // 定义 toggle 函数，用于切换状态值
    const toggle = () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue));

    // 定义 setLeft 函数，用于将状态值设置为 defaultValue
    const setLeft = () => setState(defaultValue);

    // 定义 setRight 函数，用于将状态值设置为 reverseValueOrigin（若未传入 reverseValue，则设置为 defaultValue 的取反）
    const setRight = () => setState(reverseValueOrigin);

    // 定义 set 函数，用于将状态值设置为指定的值
    const set = (value: D | R) => setState(value);

    // 返回包含操作集合的对象
    return {
      toggle,
      setLeft,
      setRight,
      set,
    };
  }, []);

  // 返回状态值和操作集合
  return [state, action];
}
export default useToggle;
