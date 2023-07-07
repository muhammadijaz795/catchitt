import { createBoard } from '@wixc3/react-board';
import { TopBar } from '../../../components/top-bar/top-bar';

export default createBoard({
    name: 'TopBar',
    Board: () => <TopBar />,
    environmentProps: {
        canvasWidth: 1920,
        canvasHeight: 1080,
        windowHeight: 1080,
        windowWidth: 1986,
    },
});
