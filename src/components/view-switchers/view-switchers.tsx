import classNames from 'classnames';
import styles from './view-switchers.module.scss';
import { useState } from 'react';

export interface ViewSwitchersProps {
    className?: string;
    onTabChange: (index: number) => void;
}

export const ViewSwitchers = ({ className, onTabChange }: ViewSwitchersProps) => {
    const [selectedLink, setSelectedLink] = useState<number | null>(1);

    const handleLinkClick = (index: number) => {
        setSelectedLink(index);
        onTabChange(index); // Notify the parent component about the selected tab index
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.tabs}>
                <button
                    className={classNames(`${selectedLink === 0 ? styles.selected : styles.myBtn}`)}
                    onClick={() => handleLinkClick(0)}
                >
                    Following
                </button>
                <button
                    className={classNames(`${selectedLink === 1 ? styles.selected : styles.myBtn}`)}
                    onClick={() => handleLinkClick(1)}
                >
                    For You
                </button>
            </div>
            {/* <button
                className={classNames(`${selectedLink === 2 ? styles.selected : styles.myBtn}`)}
                onClick={() => handleLinkClick(2)}
            >
                Live
            </button> */}
        </div>
    );
};
