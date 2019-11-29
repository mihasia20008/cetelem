import React, {useCallback, useEffect, useRef, useState} from 'react';

import CloseIcon from '../../../icons/CloseIcon';

import useCloseOnOutsideEvents from '../../../../utilities/useCloseOnOutsideEvents';

import styles from './Layout.module.scss';

function Layout(props) {
  const { children, onClose } = props;

  const [mounted, setMount] = useState(false);
  const contentRef = useRef(null);

  useCloseOnOutsideEvents({
    ref: contentRef,
    callback: useCallback(() => onClose(), [onClose]),
    isOpen: mounted,
  });

  useEffect(() => {
    if (contentRef.current) {
      setMount(true);
    }
  }, []);

  return (
    <div className={styles.Layout}>
      <div className={styles.backdrop} />
      <div className={styles.content} ref={contentRef}>
        {children}
        <button type="button" className={styles.closer} onClick={onClose}>
          <CloseIcon className={styles.closerIcon} />
        </button>
      </div>
    </div>
  );
}

export default Layout;
