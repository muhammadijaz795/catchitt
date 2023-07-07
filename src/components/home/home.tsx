import classNames from 'classnames';
import styles from './home.module.scss';
import { TopBar } from '../top-bar/top-bar';

export interface HomeProps {
    className?: string;
}

export const Home = ({ className }: HomeProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.topBarDiv}>
                <TopBar />
            </div>
            <div />
        </div>
    );
};
