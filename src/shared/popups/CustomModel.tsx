import { ClickAwayListener, Modal } from '@mui/material';

function CustomModel({ open, onClose, children }: any) {
    return (
        <Modal
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            open={open}
        >
            <ClickAwayListener onClickAway={onClose}>{children}</ClickAwayListener>
        </Modal>
    );
}

export default CustomModel;
