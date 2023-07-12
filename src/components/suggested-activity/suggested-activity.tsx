import classNames from 'classnames';
import styles from './suggested-activity.module.scss';

export interface SuggestedActivityProps {
    className?: string;
}

export const SuggestedActivity = ({ className }: SuggestedActivityProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.suggestedAccountsDiv}>
                <div className={styles.suggestedHeader}>
                    <h4 className={styles.headerTitle}>Suggested Accounts</h4>
                    <a href="">See All</a>
                </div>
                <div className={styles.suggestedContent} />
            </div>
            <div className={styles.seperatorDiv} />
            <div className={styles.activityDiv} />
        </div>
    );
};
