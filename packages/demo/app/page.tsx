import styles from './page.module.css'
import KvDis from 'kvdis-nextjs'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className={styles.main}>
      <KvDis commentsKey="kvdist-nextjs-demo" />
    </main>
  )
}
