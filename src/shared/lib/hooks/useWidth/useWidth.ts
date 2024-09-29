import { useState, useEffect } from 'react';

export default function useWidth(debounceTime: number = 200): number {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Проверка на существование window

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId); // Очищаем предыдущий таймаут
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth); // Устанавливаем новое значение ширины с задержкой
      }, debounceTime);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId); // Чистим таймаут при размонтировании компонента
    };
  }, [debounceTime]);

  return width;
}
