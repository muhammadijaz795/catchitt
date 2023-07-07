import { createBoard } from '@wixc3/react-board';
import { SideNavBar } from '../../../components/side-nav-bar/side-nav-bar';

export default createBoard({
    name: 'SideNavBar',
    Board: () => <SideNavBar />,
    environmentProps: {
        canvasWidth: 1270,
        canvasHeight: 1080,
        windowHeight: 1080,
        windowWidth: 1986,
    },
});
