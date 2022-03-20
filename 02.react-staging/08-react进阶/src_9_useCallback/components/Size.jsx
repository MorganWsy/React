import React, { useState, useEffect, useCallback } from 'react'

/* 自定义一个Hook方法 */
function useWindowSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });
  // useCallback函数返回一个缓存的函数(第一个参数函数），它的第二个参数也是接收一组依赖项，只有这些依赖项的值发生变化了，useCallback的第一个参数函数才会重新执行，并返回一个新的缓存函数。
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  },[]);

  useEffect(() => {
    // 监听浏览器窗口大小的变化
    window.addEventListener('resize', onResize);
    return () => {
      // 组件卸载之前，清除时间监听
      window.removeEventListener('resize', onResize);
    }
  }, [onResize]);
  // 返回窗口大小
  return size;
}

export default function Size() {
  const size = useWindowSize();
  return (
    <div>
      <h1>当前窗口大小为: {size.width} x {size.height}</h1>
    </div>
  )
}
