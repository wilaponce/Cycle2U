import AnimatedPageWrapper from '../components/animated_components/AnimatedPageWrapper';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <AnimatedPageWrapper>
      <Layout>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-cycleGreen mb-8">Welcome to Cycle2u</h1>
        <nav className="space-y-4 w-full max-w-sm">
          <Link href="/login">
            <a className="block w-full text-center bg-cycleGreen text-white py-3 rounded shadow hover:bg-green-700 transition">Login</a>
          </Link>
          <Link href="/signup">
            <a className="block w-full text-center bg-cycleGreen text-white py-3 rounded shadow hover:bg-green-700 transition">Sign Up</a>
          </Link>
          <Link href="/dashboard">
            <a className="block w-full text-center bg-cycleGreen text-white py-3 rounded shadow hover:bg-green-700 transition">Dashboard</a>
          </Link>
          <Link href="/driver-portal">
            <a className="block w-full text-center bg-cycleGreen text-white py-3 rounded shadow hover:bg-green-700 transition">Driver Portal</a>
          </Link>
        </nav>
      </div>
      </Layout>
    </AnimatedPageWrapper>
  );
}
