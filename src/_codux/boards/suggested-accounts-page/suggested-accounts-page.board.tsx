import { createBoard } from '@wixc3/react-board';
import { SuggestedAccountsPage } from '../../../components/suggested-accounts-page/suggested-accounts-page';

export default createBoard({
    name: 'SuggestedAccountsPage',
    Board: () => <SuggestedAccountsPage />,
    environmentProps: {
        canvasWidth: 1920,
        canvasHeight: 1080,
        windowHeight: 1080,
        windowWidth: 1920,
    },
});
