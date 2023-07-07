import { createBoard } from '@wixc3/react-board';
import { Home } from '../../../components/home/home';

export default createBoard({
    name: 'Home',
    Board: () => <Home />,
    environmentProps: {
        canvasWidth: 1920,
        canvasHeight: 1080,
        windowHeight: 1080,
        windowWidth: 1986,
    },
});
