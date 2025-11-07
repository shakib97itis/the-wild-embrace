import {useEffect, useRef} from 'react';

const useOutsideClick = (handler, listenCapturing = true) => {
  const ref = useRef(null);

  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', listener, listenCapturing);
    document.addEventListener('touchstart', listener, listenCapturing);

    return () => {
      document.removeEventListener('mousedown', listener, listenCapturing);
      document.removeEventListener('touchstart', listener, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
};

export default useOutsideClick;
