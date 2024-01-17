import { type Metadata } from 'next';
import { Toast } from './toast';
import localFont from 'next/font/local';

import 'styles/globals.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from 'contexts/auth';
import Script from 'next/script';

const Din = localFont({
  src: [
    {
      path: './din.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './din-medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
});

const Ivy = localFont({
  src: './ivy.woff2',
  display: 'swap',
  variable: '--font-secondary',
});

export const metadata: Metadata = {
  title: '',
  description: '',
};
const GTM_ID = 'GTM-PL738CTD';

const RootLayout: BTypes.NLPage = ({ children }) => {
  return (
    <html lang="pt-BR" className={`${Din.className} ${Ivy.variable}`}>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${GTM_ID}');
            `,
          }}
        />
      </head>
      <AuthProvider>
        <body className="min-h-screen flex flex-col">
          <Toast />
          {children}

          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </body>
      </AuthProvider>
    </html>
  );
};

export default RootLayout;
