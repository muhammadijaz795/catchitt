import { createBoard } from '@wixc3/react-board';
import { SideNavBar } from '../../../components/side-nav-bar/side-nav-bar';

export default createBoard({
    name: 'SideNavBar',
    Board: () => <SideNavBar />
});
