import AnimatedPageWrapper from '../components/animated_components/AnimatedPageWrapper';

export default function SignUp() {
  return (
    <AnimatedPageWrapper>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
          <button className="px-4 py-2 bg-green-600 text-white rounded">Sign Up</button>
        </form>
      </div>
    </AnimatedPageWrapper>
  );
}