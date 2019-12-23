import { useEffect, useCallback } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const useCloseOnOutsideEvents = ({ ref, callback, isOpen, disableBody }) => {
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

  useEffect(() => {
    if (isOpen) {
      if (disableBody) {
        disableBodyScroll(domNode, {
          allowTouchMove: el => {
            let current = el;
            while (current && current !== domNode) {
              if (current.hasAttribute && current.hasAttribute('data-allow-touch-move')) {
                return true;
              }
              current = current.parentNode;
            }

            return false;
          },
        });
      }
      document.addEventListener('mousedown', closeOnOutsideClick);
      document.addEventListener('touchstart', closeOnOutsideClick);
    } else {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('touchstart', closeOnOutsideClick);
    }
    return () => {
      if (disableBody) {
        enableBodyScroll(domNode);
      }
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('touchstart', closeOnOutsideClick);
    };
  }, [closeOnOutsideClick, disableBody, domNode, isOpen]);
};

export default useCloseOnOutsideEvents;
