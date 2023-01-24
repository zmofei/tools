import { i18n } from './lib/i18n';

export default function Head() {
  const title_txt = i18n({ 'zh': 'Mofei的工具箱', 'en': 'Mofei tooles' })
  return (
    <>
      <title>{title_txt}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="The tools for web developer" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}
