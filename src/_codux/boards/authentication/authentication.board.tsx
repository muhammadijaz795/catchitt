import { createBoard } from '@wixc3/react-board';
import { Authentication } from '../../../components/authentication/authentication';

export default createBoard({
    name: 'Authentication',
    Board: () => <Authentication />,
    environmentProps: {
        canvasWidth: 1920,
        canvasHeight: 1080,
        windowHeight: 1080,
        windowWidth: 1920,
    },
});
