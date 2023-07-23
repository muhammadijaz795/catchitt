import { createBoard } from '@wixc3/react-board';
import { ViewSwitchers } from '../../../components/view-switchers/view-switchers';

export default createBoard({
    name: 'ViewSwitchers',
    Board: () => <ViewSwitchers />,
    environmentProps: {
        canvasWidth: 1920,
        canvasHeight: 1080,
        windowHeight: 1080,
        windowWidth: 1986,
    },
});
