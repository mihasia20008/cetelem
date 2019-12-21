import React from 'react';
import PropTypes from 'prop-types';

import Portal from './Portal';
import Layout from './Layout';

function Modal(props) {
  const { id, open, children, dark, onClose } = props;

  if (!open) {
    return null;
  }

  return (
    <Portal id={id}>
      <Layout onClose={onClose} dark={dark}>
        {children}
      </Layout>
    </Portal>
  );
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  onClose: undefined,
};

export default Modal;
