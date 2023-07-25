import { createBoard } from '@wixc3/react-board';
import { ActivityPage } from '../../../components/activity-page/activity-page';

export default createBoard({
    name: 'ActivityPage',
    Board: () => <ActivityPage />,
    environmentProps: {
        canvasWidth: 1920,
        canvasHeight: 1080,
        windowHeight: 1080,
        windowWidth: 1920,
    },
});
