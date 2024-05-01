import React from 'react';
import styles from './likesModal.module.scss';
import { useSelector } from 'react-redux';

interface LikesModalProps {}
function LikesModal(props:LikesModalProps) {
    const totalLikes = useSelector((state: any) => state?.reducers?.profile?.likesNum);
    const name = useSelector((state: any) => state?.reducers?.profile?.name);

    return (
        <>
            <div className={styles['main-container']}>
                <div className={styles.header}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.separator}> </span>
                    <span className={styles.likes}>received {totalLikes} likes across all videos.</span>
                </div>
                <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&"
                    className={styles["image-wrapper"]}
                    alt="Social Media Stats"
                />
            </div>
        </>
    );
}

export default LikesModal;
