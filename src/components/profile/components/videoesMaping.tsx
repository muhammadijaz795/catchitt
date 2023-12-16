import styles from './videoesMapin.module.scss'

interface Type {
    videos: any,
    openVideoModal: any
}
export default function VideoesMaping({ videos, openVideoModal }: Type) {
    return (
        <div className={styles.posts}>
            {videos &&
                videos.map((item: any, i: number) => (
                    <div
                        key={i}
                        onClick={() => openVideoModal(item)}
                        className={styles.post}
                    >
                        <img
                            className={styles.thumbnail}
                            src={item?.thumbnailUrl}
                            alt=""
                        />
                        <div className={styles.views}>
                            <img
                                src="../../../../public/images/icons/views.svg"
                                alt=""
                            />
                            <p className={styles.viewsText}>{item.views}</p>
                        </div>
                    </div>
                ))}

        </div>
    )
}
