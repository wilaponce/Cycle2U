
import '@/styles/globals.css';
import Sidebar from '@/components/layout/Sidebar';
import MobileDrawer from '@/components/layout/MobileDrawer';

export const metadata = {
  title: 'Cycle2U',
  description: 'Recycling made easy for everyone.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-gray-50 text-gray-900'>
        <div className='flex min-h-screen'>
          <Sidebar />
          <MobileDrawer />
          <main className='flex-1 p-4 md:p-6'>{children}</main>
        </div>
      </body>
    </html>
  );
}
