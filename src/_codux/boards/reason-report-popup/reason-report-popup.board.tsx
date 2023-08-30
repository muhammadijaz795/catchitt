import { createBoard } from '@wixc3/react-board';
import { ReasonReportPopup } from '../../../components/reason-report-popup/reason-report-popup';

export default createBoard({
    name: 'ReasonReportPopup',
    Board: () => <ReasonReportPopup />,
    environmentProps: {
        canvasWidth: 1920,
        canvasHeight: 1080,
        windowHeight: 1080,
        windowWidth: 1920,
    },
});
