import classNames from 'classnames';
import styles from './home.module.scss';
import { TopBar } from '../top-bar/top-bar';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { ViewSwitchers } from '../view-switchers/view-switchers';
import { Post } from '../post/post';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';

export interface HomeProps {
    className?: string;
}

export const Home = ({ className }: HomeProps) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    } else {
        return (
            <div className={classNames(styles.root, className)}>
                <div className={styles.topBarDiv}>
                    <TopBar />
                </div>
                <div className={styles.container}>
                    <div className={styles.leftSide}>
                        <div className={styles.sideNavDiv}>
                            <SideNavBar selectedIndex={0} />
                        </div>
                        <div className={styles.suggestedActivityDiv}>
                            <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                        </div>
                    </div>
                    <div className={styles.middleSectionDiv}>
                        <ViewSwitchers />
                        <Post />
                    </div>
                </div>
            </div>
        );
    }
};
