import { useRef, useEffect } from 'react';


const useClickOutside = (callback) => {
  const ref = useRef(null);
  const callbackRef = useRef();

  callbackRef.current = callback;

  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target))  {
        callbackRef.current?.();
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, []);

  return ref;
};

export default useClickOutside;