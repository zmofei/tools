import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { i18n } from './lib/i18n';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const hostname = i18n({ "zh": "zhuwenlong", "en": "himofei" })
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p> {i18n({ "zh": "Mofei最爱的生产力工具", "en": "Mofei's favorite tool for productivity" })}</p>
        <div>
          <span>By</span>
          <a
            href={`https://www.${hostname}.com`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/mofei-logo.svg"
              alt="Vercel Logo"
              width={50}
              height={54}
              priority
            />
          </a>
          <span className={styles.descriptionHeart}>❤️</span>
          <a href='https://nextjs.org/' target="_blank"
            rel="noopener noreferrer">

            <Image
              src="/next.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={50}
              height={54}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <span>tools.{hostname}.com</span>
        <div className={styles.thirteen}>
          <Image src="/logo.svg" alt="13" width={60} height={60} priority />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Deploy <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main >
  )
}
