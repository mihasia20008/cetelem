import { useEffect, useCallback } from 'react';

const useCloseOnOutsideEvents = ({ ref, callback, isOpen }) => {
  const { current: domNode } = ref;

  const closeOnOutsideClick = useCallback(
    event => {
      if (domNode && !domNode.contains(event.target)) {
        if (callback) {
          callback();
        }
      }
    },
    [domNode, callback]
  );

  useEffect(
    () => {
      if (isOpen) {
        document.addEventListener('mousedown', closeOnOutsideClick);
        document.addEventListener('touchstart', closeOnOutsideClick);
      } else {
        document.removeEventListener('mousedown', closeOnOutsideClick);
        document.removeEventListener('touchstart', closeOnOutsideClick);
      }
      return () => {
        document.removeEventListener('mousedown', closeOnOutsideClick);
        document.removeEventListener('touchstart', closeOnOutsideClick);
      };
    },
    [closeOnOutsideClick, isOpen]
  );
};

export default useCloseOnOutsideEvents;
