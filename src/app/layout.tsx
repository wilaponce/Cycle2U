import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Cycle2u',
  description: 'Recycling Made Simple',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        {/* Navbar fixed at top */}
        <header className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </header>

        {/* Main content with padding for Navbar */}
        <main className="flex-1 pt-16 pb-16 px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer fixed at bottom */}
        <footer className="w-full">
          <Footer />
        </footer>
      </body>
    </html>
  );
}