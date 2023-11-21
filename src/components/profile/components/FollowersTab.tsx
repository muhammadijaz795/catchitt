import * as React from 'react';
import styles from './followersTab.module.scss';
export default function FollowersTab() {
    return (
        <>
            <div className={styles.div}>
                <div className={styles['div-2']}>
                    <div className={styles['div-3']}>
                        <img
                            loading="lazy"
                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3d27e4ba-1119-47b4-b749-8b2fa03e84fa?apiKey=8f7324cf1f4747198abbea6be25c359c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d27e4ba-1119-47b4-b749-8b2fa03e84fa?apiKey=8f7324cf1f4747198abbea6be25c359c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d27e4ba-1119-47b4-b749-8b2fa03e84fa?apiKey=8f7324cf1f4747198abbea6be25c359c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d27e4ba-1119-47b4-b749-8b2fa03e84fa?apiKey=8f7324cf1f4747198abbea6be25c359c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d27e4ba-1119-47b4-b749-8b2fa03e84fa?apiKey=8f7324cf1f4747198abbea6be25c359c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d27e4ba-1119-47b4-b749-8b2fa03e84fa?apiKey=8f7324cf1f4747198abbea6be25c359c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d27e4ba-1119-47b4-b749-8b2fa03e84fa?apiKey=8f7324cf1f4747198abbea6be25c359c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d27e4ba-1119-47b4-b749-8b2fa03e84fa?apiKey=8f7324cf1f4747198abbea6be25c359c&"
                            className={styles.img}
                        />
                        <div className={styles['div-4']}>Mohamed Farag</div>
                    </div>
                    <div className={styles['div-5']}>Follow back</div>
                </div>
                <div className={styles['div-border']} />
            </div>
        </>
    );
}
