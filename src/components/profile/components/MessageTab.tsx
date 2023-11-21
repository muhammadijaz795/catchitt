import styles from './messageTab.module.scss';
function MessageTab() {
    return (
        <div className={styles.div}>
            <div className={styles['div-18']}>
                <div className={styles['div-19']}>
                    <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8f4b6b45-c38f-48b1-88e1-470d20791f7a?apiKey=8f7324cf1f4747198abbea6be25c359c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4b6b45-c38f-48b1-88e1-470d20791f7a?apiKey=8f7324cf1f4747198abbea6be25c359c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4b6b45-c38f-48b1-88e1-470d20791f7a?apiKey=8f7324cf1f4747198abbea6be25c359c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4b6b45-c38f-48b1-88e1-470d20791f7a?apiKey=8f7324cf1f4747198abbea6be25c359c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4b6b45-c38f-48b1-88e1-470d20791f7a?apiKey=8f7324cf1f4747198abbea6be25c359c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4b6b45-c38f-48b1-88e1-470d20791f7a?apiKey=8f7324cf1f4747198abbea6be25c359c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4b6b45-c38f-48b1-88e1-470d20791f7a?apiKey=8f7324cf1f4747198abbea6be25c359c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4b6b45-c38f-48b1-88e1-470d20791f7a?apiKey=8f7324cf1f4747198abbea6be25c359c&"
                        className={styles['img-2']}
                    />
                    <div className={styles['div-20']}>Mohamed Farag</div>
                </div>
                <div className={styles['div-21']}>Message</div>
            </div>
                <div className={styles['div-border']} />
        </div>
    );
}

export default MessageTab;
