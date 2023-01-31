import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import lanPick from '@/components/i18n/languageFn'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ lan }: any) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            {lanPick(lan, { "zh": "Mofei喜欢的生产力工具", "en": "The productivity tools that Mofei loves" })}
          </p>
          <div className={styles.descriptionRight}>
            By{' '}
            <a
              href={`https://www.${lanPick(lan, { "zh": "zhuwenlong", "en": "himofei" })}.com`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/mofei-logo.svg"
                alt="Mofei Logo"
                className={styles.vercelLogo}
                width={50}
                height={24}
                priority
              />
            </a>
            <span className={styles.descriptionEmoji}>❤️</span>
            <a href={`https://www.nextjs.org`}
              target="_blank"
              rel="noopener noreferrer">
              <Image
                src="/next.svg"
                alt="nextjs Logo"
                className={styles.vercelLogo}
                width={50}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <div className={styles.thirteen}>
            <Image
              src="/logo.svg"
              alt="13"
              width={80}
              height={80}
              priority
            />
          </div>
          <div className={styles.host}>Tools.{lanPick(lan, { "zh": "ZhuWenlong", "en": "HiMofei" })}.com</div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}