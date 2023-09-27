import classNames from 'classnames';
import { useState } from 'react';
import styles from './view-switchers.module.scss';

export interface ViewSwitchersProps {
    className?: string;
    onTabChange: (index: number) => void;
    selectedIndex: number;
}

export const ViewSwitchers = ({ className, onTabChange, selectedIndex }: ViewSwitchersProps) => {
    const [selectedLink, setSelectedLink] = useState<number>(selectedIndex);

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
