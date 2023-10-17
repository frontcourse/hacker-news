import styles from './Layout.module.css'

export function Layout({children}) {
    return <div className={styles.layout}>{children}</div>
}