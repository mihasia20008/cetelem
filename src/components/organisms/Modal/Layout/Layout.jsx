import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import CloseIcon from '../../../icons/CloseIcon';

import useCloseOnOutsideEvents from '../../../../utilities/useCloseOnOutsideEvents';

import styles from './Layout.module.scss';

function Layout(props) {
  const { children, dark, onClose } = props;

  const [mounted, setMount] = useState(false);
  const contentRef = useRef(null);

  useCloseOnOutsideEvents({
    ref: contentRef,
    callback: useCallback(onClose, [onClose]),
    isOpen: mounted,
    disableBody: true,
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
        {onClose && (
          <button
            type="button"
            className={cls(styles.closer, dark ? styles.darkCloser : styles.lightCloser)}
            onClick={onClose}
          >
            <CloseIcon
              className={cls(
                styles.closerIcon,
                dark ? styles.darkCloserIcon : styles.lightCloserIcon
              )}
            />
          </button>
        )}
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  dark: PropTypes.bool,
};

Layout.defaultProps = {
  onClose: undefined,
  dark: false,
};

export default Layout;
