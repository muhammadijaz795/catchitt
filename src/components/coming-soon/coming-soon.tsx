import React from 'react';
// import classNames from 'classnames';
import styles from './coming-soon.module.scss';

export interface ComingSoonProps {
    className?: string;
}

const ComingSoon: React.FC = ({ }: ComingSoonProps) => {
    return (
        <div className={styles.container}>
            <h1>Coming Soon</h1>
        </div>
    );
};

export default ComingSoon;
