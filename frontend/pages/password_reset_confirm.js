
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function PasswordResetConfirm() {
  const router = useRouter();
  const { token } = router.query;

  const handleConfirm = async () => {
    try {
      const res = await fetch('/api/Account/ValidatePasswordResetToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      if (res.ok) {
        toast.success('Password reset confirmed');
        router.push('/password-reset-success');
      } else {
        toast.error('Invalid or expired token');
      }
    } catch (err) {
      toast.error('Error confirming password reset');
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold mb-4">Confirm Password Reset</h1>
      <button onClick={handleConfirm} className="bg-blue-600 text-white px-4 py-2 rounded">
        Confirm Reset
      </button>
    </div>
  );
}
