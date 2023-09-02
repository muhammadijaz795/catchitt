import { createBoard } from '@wixc3/react-board';
import { ForgotPassword } from '../../../components/forgot-password/forgot-password';

export default createBoard({
    name: 'ForgotPassword',
    Board: () => <ForgotPassword />,
    environmentProps: {
        canvasWidth: 1920,
        canvasHeight: 1080,
        windowHeight: 1080,
        windowWidth: 1920,
    },
});
