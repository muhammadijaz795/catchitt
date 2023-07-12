import { createBoard } from '@wixc3/react-board';
import { SuggestedActivity } from '../../../components/suggested-activity/suggested-activity';

export default createBoard({
    name: 'SuggestedActivity',
    Board: () => <SuggestedActivity />,
    environmentProps: {
        canvasWidth: 1270,
        canvasHeight: 1080,
        windowHeight: 1080,
        windowWidth: 1986,
    },
});
