import React from 'react';
import classNames from 'classnames';
import styles from './coming-soon.module.scss';
import { TopBar } from '../top-bar/top-bar';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';

export interface ComingSoonProps {
    className?: string;
}

const ComingSoon: React.FC = ({ className }: ComingSoonProps) => {
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
                    <div className={styles.suggestedContent}>
                        <h4 style={{ alignSelf: 'center' }}>Coming Soon</h4>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ComingSoon;
