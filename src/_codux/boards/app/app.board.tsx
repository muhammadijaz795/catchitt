import { createBoard } from '@wixc3/react-board';
import App from '../../../App';

export default createBoard({
    name: 'App',
    Board: () => <App />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
        canvasWidth: 1920,
        canvasHeight: 1080,
        canvasPadding: {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
        },
        canvasMargin: { right: 0, bottom: 0, left: 0, top: 0 },
    },
});
