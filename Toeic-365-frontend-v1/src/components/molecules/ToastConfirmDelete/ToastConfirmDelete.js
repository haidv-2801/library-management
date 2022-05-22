import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_THEME } from '../../../constants/commonConstant';
import Button from '../../atomics/base/Button/Button';
import Modal from '../../atomics/base/ModalV2/Modal';
import './toastConfirmDelete.scss';

ToastConfirmDelete.propTypes = {
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
};

ToastConfirmDelete.defaultProps = {};

function ToastConfirmDelete(props) {
  const { onClose, onAccept } = props;
  return (
    <Modal
      title={'Xóa dữ liệu'}
      show
      maximizable={false}
      footerRight={[
        <Button theme={BUTTON_THEME.THEME_6} onClick={onClose} name="Hủy" />,
        <Button name="Xác nhận" onClick={onAccept} />,
      ]}
      onClose={onClose}
      className="toe-toast-delete"
    >
      Bạn có chắc muốn xóa?
    </Modal>
  );
}

export default ToastConfirmDelete;
