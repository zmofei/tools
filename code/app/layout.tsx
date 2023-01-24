import './globals.css'
import { i18n } from './lib/i18n';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang={i18n({ 'zh': 'zh', 'en': 'en' })}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  )
}
