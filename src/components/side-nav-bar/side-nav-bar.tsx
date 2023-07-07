import classNames from 'classnames';
import styles from './side-nav-bar.module.scss';

export interface SideNavBarProps {
    className?: string;
}

export const SideNavBar = ({ className }: SideNavBarProps) => {
    return <div className={classNames(styles.root, className)}>SideNavBar</div>;
};
