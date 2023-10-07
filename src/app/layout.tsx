import { type Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Toast } from './toast';

import 'styles/globals.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from 'contexts/auth';

const roboto = Roboto({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '',
  description: '',
};

const RootLayout: BTypes.NLPage = ({ children }) => {
  return (
    <html lang="pt-br" className={roboto.className}>
      <AuthProvider>
        <body className="min-h-screen flex flex-col">
          <Toast />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
};

export default RootLayout;
