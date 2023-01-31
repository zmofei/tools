import '@/styles/globals.css'
import type { AppProps } from 'next/app'

function App({ Component, pageProps, lan }: any) {
  return <Component {...pageProps} lan={lan} />
}

App.getInitialProps = async ({ ctx }: any) => {

  const host = ctx.req.headers.host;

  let lan = 'zh';
  if (/himofei\.com/.test(host.toLocaleLowerCase())) {
    lan = 'en';
  };

  return { lan: lan }
}

export default App