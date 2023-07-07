import classNames from 'classnames';
import styles from './top-bar.module.scss';
import coloredLogo from '../../assets/coloredLogo.png';
import plusIcon from '../../assets/plusIcon.png';
import profileIcon from '../../assets/profileIcon.png';
// import searchBar from '../reusables/searchBar'
import SearchBar from '../reusables/searchBar';

export interface TopBarProps {
    className?: string;
}

export const TopBar = ({ className }: TopBarProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div>
                <img className={classNames('Logo', styles.logo)} src={coloredLogo} alt="" />
            </div>
            <div className={styles.searchPlusProfileDiv}>
                <div className={styles['searchBar-Div']}>
                    <SearchBar />
                </div>
                <div className={styles.plusProfileDiv}>
                    <img src={plusIcon} alt="" className={styles.plusIconStyle} />
                    <img src={profileIcon} alt="" className={styles.plusIconStyle} />
                    <h4 className={styles.loggedName}>Radwa Aly</h4>
                </div>
            </div>
        </div>
    );
};
