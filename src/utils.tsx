import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

// https://stackoverflow.com/a/10050831/843194
export function range(size: number, startAt = 0): number[] {
  // tslint:disable-next-line:prefer-array-literal
  return Array.from(Array(size).keys()).map((i: number) => i + startAt);
}

export const lpad = (n: number, length = 2) => ('' + n).padStart(length, '0');

export function uniq<T>(xs: T[]): T[] {
  const s = new Set<T>(xs);
  const r: T[] = [];
  s.forEach(x => r.push(x));
  return r;
}

export const useDatetime = () => {
  const ref = useRef<NodeJS.Timeout>();
  const [datetime, setDatetime] = useState(new Date());

  const ticker = useCallback(
    () =>
      setInterval(() => {
        setDatetime(new Date());
      }, 1000),
    []
  );

  useEffect(() => {
    if (!ref.current) {
      // @ts-ignore "Type 'number' is not assignable to type 'Timeout | undefined'." despite the correct types everywhere.
      ref.current = ticker();
    }
    return () => clearInterval(ref.current!);
  }, [ticker]);

  useLayoutEffect(() => {
    setDatetime(new Date());
  }, []);

  return datetime;
};

export function useEventListener(
  eventName: string,
  handler: EventListener,
  ref?: React.RefObject<HTMLElement>
) {
  // https://usehooks.com/useEventListener/
  // remember to use "useCallback" on your handler.

  useEffect(() => {
    const current = ref ? ref.current : window;

    if (!current) {
      console.warn('ref current not set!');
      return;
    }

    const isSupported = current.addEventListener;
    if (!isSupported) {
      throw new Error('event listener not supported');
    }
    current.addEventListener(eventName, handler);

    return () => {
      current.removeEventListener(eventName, handler);
    };
  }, [eventName, ref, handler]);
}

export const toRadians = (deg: number) => {
  return deg * (Math.PI / 180);
};

export const toDeg = (radians: number) => {
  return radians * (180 / Math.PI);
};
