import styles from './privatePosts.module.scss'
export const PrivatePosts = ({ tab, name}: any) => {
    return (
        <div className={styles.privatepost}>
            <img
                style={{ marginTop: 48 }}
                src="../../../../public/images/icons/lock.svg"
                alt=""
            />
            <p style={{ marginTop: 15 }} className={styles.privatevideostext}>
                This user's {tab&&tab} {tab ==="Liked Videos" && 'posts'} are private
            </p>
            <p
                style={{ marginBottom: 78 }}
                className={styles.privatevideostext}
            >
                {tab&&tab} {tab ==="Liked Videos" && 'posts'} of {name&&name} are currently hidden
            </p>
        </div>
    )
}