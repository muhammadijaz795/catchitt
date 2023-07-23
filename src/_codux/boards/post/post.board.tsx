import { createBoard } from '@wixc3/react-board';
import { Post } from '../../../components/post/post';

export default createBoard({
    name: 'Post',
    Board: () => <Post />,
    environmentProps: {
        canvasWidth: 1920,
        canvasHeight: 1080,
        windowHeight: 1080,
        windowWidth: 1986,
    },
});
