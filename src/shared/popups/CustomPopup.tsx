import { ClickAwayListener, Modal, styled } from '@mui/material';
import Text from '../components/Text';
import CustomButton from '../buttons/CustomButton';

function CustomPopup(props: any) {
    const {
        maxWidth = 480,
        height = 'auto',
        backgroundColor= props.backgroundColor,
        color,
        borderRadius = 8,
        padding = '1.5rem',
        onClose,
        open,
        title,
        description,
        primaryBtnText,
        onPrimaryBtnClick,
        btnText,
        onBtnClick,
    } = props;
    const StyledPopupParent = styled('div')(() => ({
        maxWidth,
        height,
        backgroundColor,
        borderRadius,
        padding,
        border: 0,
        outline: 0,
    }));
    return (
        <Modal
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            open={open}
        >
            <ClickAwayListener onClickAway={onClose}>
                <StyledPopupParent>
                    <Text
                        textAlign="center"
                        fontSize={18}
                        fontWeight={600}
                        text={title}
                        color={color}
                        marginBottom="1.5rem"
                    />
                    <Text
                        textAlign="center"
                        fontWeight={400}
                        text={description}
                        color={color}
                        lineHeight="1.5rem"
                        margin="0px auto 1rem auto"
                        width="70%"
                    />
                    <div className="flex gap-[1rem] justify-between flex-col md:flex-row">
                        <CustomButton
                            width={'200px !important'}
                            fontSize="1rem"
                            text={primaryBtnText}
                            height="48px !important"
                            onClick={onPrimaryBtnClick}
                        />
                        <CustomButton
                            width={'200px !important'}
                            fontSize="1rem"
                            text={btnText}
                            height="48px !important"
                            islight
                            onClick={onBtnClick}
                        />
                    </div>
                </StyledPopupParent>
            </ClickAwayListener>
        </Modal>
    );
}

export default CustomPopup;
