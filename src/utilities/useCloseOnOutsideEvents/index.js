import { useEffect, useCallback } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

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
        disableBodyScroll(ref);
        document.addEventListener('mousedown', closeOnOutsideClick);
        document.addEventListener('touchstart', closeOnOutsideClick);
      } else {
        document.removeEventListener('mousedown', closeOnOutsideClick);
        document.removeEventListener('touchstart', closeOnOutsideClick);
      }
      return () => {
        enableBodyScroll(ref);
        document.removeEventListener('mousedown', closeOnOutsideClick);
        document.removeEventListener('touchstart', closeOnOutsideClick);
      };
    },
    [closeOnOutsideClick, isOpen, ref]
  );
};

export default useCloseOnOutsideEvents;
