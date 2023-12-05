import styles from './privatePosts.module.scss'
export const PrivatePosts = () => {
    return (
        <div className={styles.privatepost}>
            <img
                style={{ marginTop: 48 }}
                src="../../../../public/images/icons/lock.svg"
                alt=""
            />
            <p style={{ marginTop: 15 }} className={styles.privatevideostext}>
                This user's tagged posts are private
            </p>
            <p
                style={{ marginBottom: 78 }}
                className={styles.privatevideostext}
            >
                Tagged posts of sarasaid171 are currently hidden
            </p>
        </div>
    )
}