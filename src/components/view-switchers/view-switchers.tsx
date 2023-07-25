import classNames from 'classnames';
import styles from './view-switchers.module.scss';
import { useState } from 'react';

export interface ViewSwitchersProps {
    className?: string;
}

export const ViewSwitchers = ({ className }: ViewSwitchersProps) => {
    const [selectedLink, setSelectedLink] = useState<number | null>(null);
    const handleLinkClick = (index: number) => {
        setSelectedLink(index);
    };
    return (
        <div className={classNames(styles.root, className)}>
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
            <button
                className={classNames(`${selectedLink === 2 ? styles.selected : styles.myBtn}`)}
                onClick={() => handleLinkClick(2)}
            >
                Live
            </button>
        </div>
    );
};
